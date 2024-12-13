import { eq } from "drizzle-orm";
import { db } from "../db/index";
import { matchesTable } from "../db/schema";
export type Match = {
  id: number;
  player1: string;
  player2: string;
  startTime: Date;
  endTime: Date | null;
  status: "not-started" | "ongoing" | "completed";
};

/**
 * Creates a new match between two players.
 * @param player1 The first player ID. Must not be null or empty.
 * @param player2 The second player ID. Must not be null or empty.
 * @returns The newly created match, or null if a match could not be created.
 */
// TODO: use user id instead of username
export async function createMatch(
  player1: string,
  player2: string
): Promise<Match | null> {
  if (!player1 || !player2) {
    throw new Error("Player IDs cannot be null or empty");
  }

  try {
    const result = await db
      .insert(matchesTable)
      .values({
        player1,
        player2,
        startTime: new Date(),
        status: "ongoing",
      })
      .returning();

    return result[0] ?? null;
  } catch (error) {
    console.log("Error while creating match : ", error);
    throw new Error("Error creating match");
  }
}

/**
 * Ends a match, setting its end time and status to "completed".
 * @param matchId The ID of the match to end.
 * @returns The updated match, or null if the match could not be found.
 */
export async function endMatch(matchId: number): Promise<Match | null> {
  if (!matchId) {
    throw new Error("Match ID cannot be null or empty");
  }

  try {
    const result = await db
      .update(matchesTable)
      .set({ endTime: new Date(), status: "completed" })
      .where(eq(matchesTable.id, matchId))
      .returning();

    const match = result[0];
    if (!match) {
      console.log(`Match with ID ${matchId} not found`);
      return null;
    }

    return match;
  } catch (error) {
    console.log("Error while ending match : ", error);
    throw new Error("Error ending match");
  }
}
