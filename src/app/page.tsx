import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <form action="/login/api" method="post">
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Password:
          <input type="text" name="password" />
        </label>
        <br />
        <button type="submit">Sign in</button>
      </form>
    </main>
  );
}
