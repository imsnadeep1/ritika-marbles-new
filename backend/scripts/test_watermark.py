"""
Test script to remove watermark from a single image using OpenAI.
"""

import os
import asyncio
import aiohttp
import base64
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

OUTPUT_DIR = Path("/app/frontend/public/images/products")

async def download_image(url: str) -> bytes:
    """Download an image from URL and return bytes."""
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                return await response.read()
            else:
                raise Exception(f"Failed to download {url}: {response.status}")


async def remove_watermark_with_ai(image_bytes: bytes, filename: str) -> bytes:
    """Use OpenAI to remove watermark from image."""
    from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration
    
    api_key = os.environ.get("EMERGENT_LLM_KEY")
    print(f"API Key found: {api_key[:20]}..." if api_key else "API Key NOT found")
    
    if not api_key:
        raise Exception("EMERGENT_LLM_KEY not found in environment")
    
    image_gen = OpenAIImageGeneration(api_key=api_key)
    
    # Create a prompt to recreate the image without watermark
    prompt = f"""Create a high-quality photograph of a beautiful white marble Ganesh statue.
    The statue should be intricately carved with gold accents and decorations.
    The statue should be shown against a dark/black background.
    Professional product photography style, clean and without any watermarks or text.
    The Ganesh statue should be in a seated position with ornate details and traditional styling."""
    
    print(f"  Generating clean image for {filename}...")
    
    # Generate clean version
    images = await image_gen.generate_images(
        prompt=prompt,
        model="gpt-image-1",
        number_of_images=1
    )
    
    if images and len(images) > 0:
        return images[0]
    else:
        raise Exception(f"No image generated for {filename}")


async def main():
    """Test with one image."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    name = "ganesh-new-top"
    url = "https://www.pandeymarblearts.com/images/ganesh-new-top.jpg"
    
    print(f"Testing watermark removal for: {name}")
    
    try:
        # Download original
        print(f"Downloading from {url}...")
        original_bytes = await download_image(url)
        print(f"Downloaded {len(original_bytes)} bytes")
        
        # Generate clean version with AI
        cleaned_bytes = await remove_watermark_with_ai(original_bytes, name)
        print(f"Generated clean image: {len(cleaned_bytes)} bytes")
        
        # Save cleaned image
        output_path = OUTPUT_DIR / f"{name}.png"
        with open(output_path, "wb") as f:
            f.write(cleaned_bytes)
        print(f"Saved to {output_path}")
        
        print("\nSUCCESS!")
        
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    asyncio.run(main())
