import Link from "next/link";

type HeaderProps = {
  section?: string;
};

export default function Header({ section = "INTRO" }: HeaderProps) {
  return (
    <header className="skin-header">
      <Link href="/" className="skin-logo">
        sKINsTRIC
      </Link>

      <div className="skin-header__divider" />

      <p className="skin-header__section">{section}</p>

      <button className="skin-code-btn">ENTER CODE</button>
    </header>
  );
}