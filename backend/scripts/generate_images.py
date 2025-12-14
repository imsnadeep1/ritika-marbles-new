"""
Script to generate clean marble statue images using AI.
Creates professional product images without any watermarks.
"""

import os
import asyncio
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

OUTPUT_DIR = Path("/app/frontend/public/images/products")

# Define prompts for each category/product
IMAGE_PROMPTS = [
    {
        "name": "ganesh-new-top",
        "prompt": """Professional photograph of a beautiful white marble Ganesh statue with intricate gold paint accents.
        The statue shows Lord Ganesh in a seated position with ornate crown and jewelry details.
        Shot against a dark/black background, studio lighting, product photography style.
        Clean image without any watermarks, text, or logos. High quality, detailed carving visible."""
    },
    {
        "name": "radha-krishna-1",
        "prompt": """Professional photograph of a beautiful marble Radha Krishna statue pair.
        Shows Radha and Krishna in traditional standing pose with colorful painted details.
        Radha in traditional attire with Krishna playing flute.
        Shot against a dark/black background, studio lighting, product photography style.
        Clean image without any watermarks, text, or logos. High quality marble craftsmanship visible."""
    },
    {
        "name": "ram-darbar-top",
        "prompt": """Professional photograph of a marble Ram Darbar statue set.
        Shows Lord Ram, Sita, Lakshman and Hanuman together in traditional arrangement.
        Colorful painted details on white marble, ornate thrones and decorations.
        Shot against a dark/black background, studio lighting, product photography style.
        Clean image without any watermarks, text, or logos. Temple-grade quality statue."""
    },
    {
        "name": "gallery3",
        "prompt": """Professional photograph of a marble Shiv Parvati statue.
        Shows Lord Shiva and Goddess Parvati in divine seated pose.
        White marble with gold and colored paint accents, traditional styling.
        Shot against a neutral background, studio lighting, product photography style.
        Clean image without any watermarks, text, or logos. Fine craftsmanship details visible."""
    },
    {
        "name": "gallery1",
        "prompt": """Professional photograph of a single white marble Ganesh statue.
        Elegant Ganesh murti with gold crown and jewelry details.
        Seated in blessing pose with modak in hand.
        Shot against a dark background, studio lighting, product photography style.
        Clean image without any watermarks, text, or logos. Pure white Makrana marble look."""
    },
    {
        "name": "hanuman_new",
        "prompt": """Professional photograph of a large marble Hanuman statue.
        Shows Lord Hanuman in powerful standing pose or flying pose.
        White marble with orange/saffron and gold paint accents.
        Shot against a neutral background, studio lighting, product photography style.
        Clean image without any watermarks, text, or logos. Muscular divine form with devotional expression."""
    },
    {
        "name": "mander-marble1",
        "prompt": """Professional photograph of a white marble temple (mandir) for home worship.
        Beautiful intricately carved marble temple with domes and pillars.
        Traditional Indian temple architecture style, pure white marble.
        Shot against a neutral background, studio lighting, product photography style.
        Clean image without any watermarks, text, or logos. Detailed architectural carving visible."""
    },
    {
        "name": "laddu-gopal-3",
        "prompt": """Professional photograph of a cute marble Laddu Gopal (baby Krishna) statue.
        Small adorable Krishna statue in crawling or sitting pose.
        White marble with colorful traditional dress and ornaments painted.
        Shot against a light/neutral background, studio lighting, product photography style.
        Clean image without any watermarks, text, or logos. Sweet divine baby form."""
    },
    {
        "name": "laxmi_new",
        "prompt": """Professional photograph of a marble Lakshmi Ganesh statue pair.
        Shows Goddess Lakshmi and Lord Ganesh together, perfect for Diwali worship.
        White marble with gold and red paint accents, seated on lotus bases.
        Shot against a dark background, studio lighting, product photography style.
        Clean image without any watermarks, text, or logos. Auspicious divine pair."""
    },
    {
        "name": "decor",
        "prompt": """Professional photograph of elegant marble handicrafts and home decor items.
        Shows marble vases, decorative pieces, or artistic marble sculptures.
        White marble with intricate inlay work or carved patterns.
        Lifestyle product photography, elegant interior setting or neutral background.
        Clean image without any watermarks, text, or logos. Luxurious home decor aesthetic."""
    },
    {
        "name": "decor2",
        "prompt": """Professional photograph of marble wall art or decorative marble panels.
        Shows beautiful marble inlay work or carved wall decorations.
        Traditional Indian patterns with semi-precious stone inlay on white marble.
        Interior design photography style, elegant setting.
        Clean image without any watermarks, text, or logos. Artistic craftsmanship highlighted."""
    },
]


async def generate_image(name: str, prompt: str) -> bool:
    """Generate a clean image using AI."""
    from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration
    
    try:
        api_key = os.environ.get("EMERGENT_LLM_KEY")
        if not api_key:
            raise Exception("EMERGENT_LLM_KEY not found")
        
        image_gen = OpenAIImageGeneration(api_key=api_key)
        
        print(f"\n[{name}] Generating image...")
        
        images = await image_gen.generate_images(
            prompt=prompt,
            model="gpt-image-1",
            number_of_images=1
        )
        
        if images and len(images) > 0:
            output_path = OUTPUT_DIR / f"{name}.png"
            with open(output_path, "wb") as f:
                f.write(images[0])
            print(f"[{name}] SUCCESS - Saved to {output_path}")
            return True
        else:
            print(f"[{name}] FAILED - No image generated")
            return False
            
    except Exception as e:
        print(f"[{name}] ERROR: {e}")
        return False


async def main():
    """Generate all images."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"Output directory: {OUTPUT_DIR}")
    print(f"Total images to generate: {len(IMAGE_PROMPTS)}")
    
    results = []
    for item in IMAGE_PROMPTS:
        result = await generate_image(item["name"], item["prompt"])
        results.append((item["name"], result))
        # Delay between API calls to avoid rate limiting
        await asyncio.sleep(3)
    
    # Summary
    print("\n" + "="*60)
    print("GENERATION COMPLETE")
    print("="*60)
    success = sum(1 for _, r in results if r)
    failed = sum(1 for _, r in results if not r)
    print(f"Successfully generated: {success}/{len(results)}")
    
    if failed > 0:
        print(f"\nFailed ({failed}):")
        for name, result in results:
            if not result:
                print(f"  - {name}")
    
    print("\nNext step: Update mock.js to use local images")


if __name__ == "__main__":
    asyncio.run(main())
