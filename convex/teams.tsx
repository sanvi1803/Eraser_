import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTeam = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    if (!args.email) {
      throw new Error("Email is required");
    }
    const result = await ctx.db
      .query("teams")
      .filter((q) => q.eq(q.field("createdBy"), args.email))
      .collect();
    return result;
  },
});

export const createTeam = mutation({
  args: {
    teamName: v.string(),
    createdBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("teams", {
      teamName: args.teamName,
      createdBy: args.createdBy,
    });
    return result;
  },
});
