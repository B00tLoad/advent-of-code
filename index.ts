import { program } from "commander";
import shell from "shelljs";
import { select } from "@inquirer/prompts";
import { stat } from "node:fs/promises";

program.version("0.0.1");
program
  .command("create [year] [day]")
  .description(
    "Create a new Advent of Code project for the specified year and day",
  )
  .action(async (year, day) => {
    if (!year) {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let y = currentYear; y >= 2015; y--) {
        years.push(y.toString());
      }
      year = await select({
        message: "What year do you want to create?",
        choices: years,
        loop: false,
      });
    }

    if (!day) {
      // Get list of days from 1 to 25 or 12 depending on year
      // Starting 2025 only 12 challenges will be available
      const days = [];
      for (let d = year < 2025 ? 25 : 12; d >= 1; d--) {
        days.push(d.toString());
      }
      
      // Filter for existing directories - filter out existing days
      const dayExistenceChecks = await Promise.all(
        days.map(async (value) => {
          const exists = await existsDir(`src/${year}/${value}`);
          return { value, exists };
        }),
      );
      const fDays = dayExistenceChecks
        .filter((item) => !item.exists)
        .map((item) => item.value);
      
      // Prompt user to select day
      day = await select({
        message: "What day do you want to create?",
        choices: days,
        loop: false,
      });
    }

    shell.mkdir("-p", [`./src/${year}/${day}/1`, `./src/${year}/${day}/2`]);
    shell.touch([
      `./src/${year}/${day}/1/index.ts`,
      `./src/${year}/${day}/2/index.ts`,
      `./src/${year}/${day}/input.txt`,
      `./src/${year}/${day}/testinput.txt`,
    ]);

    console.log(`Created Advent of Code project for Year ${year}, Day ${day}`);
    console.log(`Get prompt from https://adventofcode.com/${year}/day/${day}`);
    console.log()
    console.log("Remember to add your input to the input.txt file");
    console.log(
      `Get input from https://adventofcode.com/${year}/day/${day}/input`,
    );
    console.log("Happy coding!");
  });

program
  .command("run [year] [day] [part]")
  .description("Run the solution for the specified year and day")
  .action(async (year, day, part) => {
    if (!year) {
      // Get list of years from 2015 to current
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let y = currentYear; y >= 2015; y--) {
        years.push(y.toString());
      }

      //Filter for existing directories
      const yearExistenceChecks = await Promise.all(
        years.map(async (value) => {
          const exists = await existsDir(`src/${value}`);
          return { value, exists };
        }),
      );
      const fYears = yearExistenceChecks
        .filter((item) => item.exists)
        .map((item) => item.value);

      // Prompt user to select year
      year = await select({
        message: "What year do you want to run?",
        choices: fYears,
        loop: false,
      });
    }

    if (!day) {
      // Get list of days from 1 to 25 or 12 depending on year
      // Starting 2025 only 12 challenges will be available
      const days = [];
      for (let d = year < 2025 ? 25 : 12; d >= 1; d--) {
        days.push(d.toString());
      }

      // Filter for existing directories
      const dayExistenceChecks = await Promise.all(
        days.map(async (value) => {
          const exists = await existsDir(`src/${year}/${value}`);
          return { value, exists };
        }),
      );
      const fDays = dayExistenceChecks
        .filter((item) => item.exists)
        .map((item) => item.value);
      
      // Prompt user to select day
      day = await select({
        message: "What day do you want to run?",
        choices: fDays,
        loop: false,
      });
    }
    
    if (!part) {
      // Prompt user to select part
      part = await select({
        message: "What part do you want to run?",
        choices: ["1", "2"],
        loop: false,
      });
    }

    const { default: runner } = await import(
      `./src/${year}/${day}/${part}/index.ts`
    );

    runner(`./src/${year}/${day}/input.txt`);
  });

program.parse(process.argv);

async function existsDir(path: string): Promise<boolean> {
  try {
    const stats = await stat(path);
    return stats.isDirectory();
  } catch (error: any) {
    if (error.code === "ENOENT") {
      return false;
    } else {
      console.error(`An error occurred: ${error.message}`);
      throw error;
    }
  }
}
