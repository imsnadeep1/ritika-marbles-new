"""
Script to remove watermarks from images using OpenAI's image editing capabilities.
Downloads images, processes them to remove watermarks, and saves cleaned versions.
"""

import os
import asyncio
import aiohttp
import base64
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# Image URLs to process
IMAGE_URLS = [
    ("ganesh-new-top", "https://www.pandeymarblearts.com/images/ganesh-new-top.jpg"),
    ("radha-krishna-1", "https://www.pandeymarblearts.com/images/radha-krishna-1.jpg"),
    ("ram-darbar-top", "https://www.pandeymarblearts.com/images/ram-darbar-top.jpg"),
    ("gallery3", "https://www.pandeymarblearts.com/images/gallery3.jpg"),
    ("gallery1", "https://www.pandeymarblearts.com/images/gallery1.jpg"),
    ("hanuman_new", "https://www.pandeymarblearts.com/images/hanuman_new.jpg"),
    ("mander-marble1", "https://www.pandeymarblearts.com/images/mander-marble1.jpg"),
    ("laddu-gopal-3", "https://www.pandeymarblearts.com/images/laddu-gopal-3.jpg"),
    ("laxmi_new", "https://www.pandeymarblearts.com/images/laxmi_new.jpg"),
    ("decor", "https://www.pandeymarblemoorti.com/assets/front/images/uploads/decor.jpg"),
    ("decor2", "https://www.pandeymarblemoorti.com/assets/front/images/uploads/decor2.jpg"),
]

OUTPUT_DIR = Path("/app/frontend/public/images/products")


async def download_image(session: aiohttp.ClientSession, url: str) -> bytes:
    """Download an image from URL and return bytes."""
    async with session.get(url) as response:
        if response.status == 200:
            return await response.read()
        else:
            raise Exception(f"Failed to download {url}: {response.status}")


async def remove_watermark_with_ai(image_bytes: bytes, filename: str) -> bytes:
    """Use OpenAI to remove watermark from image."""
    from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration
    
    api_key = os.environ.get("EMERGENT_LLM_KEY")
    if not api_key:
        raise Exception("EMERGENT_LLM_KEY not found in environment")
    
    image_gen = OpenAIImageGeneration(api_key=api_key)
    
    # Convert image to base64 for the prompt
    image_base64 = base64.b64encode(image_bytes).decode('utf-8')
    
    # Create a prompt to recreate the image without watermark
    prompt = f"""Recreate this marble statue image exactly as shown, but completely remove all watermarks, 
    website text, and any overlaid text (like 'www.pandeymarblearts.com'). 
    Keep the statue, background, and all other details exactly the same. 
    The image should look clean and professional without any watermarks or text overlays.
    Maintain the exact same composition, lighting, colors, and quality of the original marble statue photograph."""
    
    print(f"  Processing {filename} with AI...")
    
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


async def process_single_image(session: aiohttp.ClientSession, name: str, url: str) -> bool:
    """Process a single image: download, remove watermark, save."""
    try:
        print(f"\nProcessing: {name}")
        
        # Download original
        print(f"  Downloading from {url}...")
        original_bytes = await download_image(session, url)
        print(f"  Downloaded {len(original_bytes)} bytes")
        
        # Remove watermark with AI
        cleaned_bytes = await remove_watermark_with_ai(original_bytes, name)
        print(f"  Watermark removed, got {len(cleaned_bytes)} bytes")
        
        # Save cleaned image
        output_path = OUTPUT_DIR / f"{name}.png"
        with open(output_path, "wb") as f:
            f.write(cleaned_bytes)
        print(f"  Saved to {output_path}")
        
        return True
        
    except Exception as e:
        print(f"  ERROR processing {name}: {e}")
        return False


async def main():
    """Main function to process all images."""
    # Create output directory
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Output directory: {OUTPUT_DIR}")
    
    # Process images
    async with aiohttp.ClientSession() as session:
        results = []
        for name, url in IMAGE_URLS:
            result = await process_single_image(session, name, url)
            results.append((name, result))
            # Small delay between API calls
            await asyncio.sleep(2)
    
    # Summary
    print("\n" + "="*50)
    print("SUMMARY")
    print("="*50)
    success = sum(1 for _, r in results if r)
    failed = sum(1 for _, r in results if not r)
    print(f"Successfully processed: {success}")
    print(f"Failed: {failed}")
    
    if failed > 0:
        print("\nFailed images:")
        for name, result in results:
            if not result:
                print(f"  - {name}")


if __name__ == "__main__":
    asyncio.run(main())
