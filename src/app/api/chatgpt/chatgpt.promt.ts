import { Car, Model } from "../../types";

interface GetPromptArgs {
    picture_url: Car["picture_urls"][number];
    make: Model["make"];
    model: Model["model"];
    year: Model["year"];
}
export const getPrompt = ({picture_url, make, model, year}: GetPromptArgs) => `
I want to sell my car in the marketplace. I want you to write the car description. It should be short, engaging, and down to earth.
Include any scratches, defects and visible accidents. If there is part you don't see, don't write anything about it.
Do not write why you are selling the car.

Example input:
Honda jazz 2019. picture: https://preview.thenewsmarket.com/Previews/NCAP/StillAssets/960x540/405966.JPG

Example output:
Up for sale is my 2019 Honda Jazz.  It has some scratches and the door is broken. I'm selling it because My family grew and I need bigger car.

Real input: ${make} ${model} ${year}. picture: ${picture_url}
`