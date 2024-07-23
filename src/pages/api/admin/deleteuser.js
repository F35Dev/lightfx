import { User } from "../../../lib/models/user";
import dbConnect from "../../../lib/dbConnect";

export const prerender = false;

export async function post({ request }) {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = JSON.parse(await request.json());

    await dbConnect();

    const existingUser = await User.findOne({
      email: body.email.trim(),
    }).exec();

    if (!existingUser) {
      return new Response(
        JSON.stringify({
          message: "Account with this email address does not exist.",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 404,
        }
      );
    }

    if (existingUser.isAdmin) {
      return new Response(
        JSON.stringify({
          message: "You cannot delete an admin account.",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 404,
        }
      );
    }

    await User.deleteOne({ email: body.email.trim() }).exec();

    // console.log(newUser);

    return new Response(JSON.stringify(existingUser), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  }

  return new Response(
    JSON.stringify({
      message: "Invalid Content-Type",
    }),
    { status: 400, statusText: "Bad Request" }
  );
}
