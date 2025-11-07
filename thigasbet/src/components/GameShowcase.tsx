type GameShowcaseProps = {
  onSelectGame: (gameName: string) => void;
  selectedGame: string | null;
};

export default function GameShowcase({ onSelectGame, selectedGame }: GameShowcaseProps) {
  const games = [
    {
      name: "Slot Machine",
      img: "https://as1.ftcdn.net/v2/jpg/02/14/07/76/1000_F_214077691_8OCmrKTMw4BgDR6i4YDJO1lGvSr2RuGQ.jpg",
    },
    {
      name: "Golden Dice",
      img: "https://cdn-icons-png.flaticon.com/512/1179/1179069.png",
    },
    {
      name: "Roulette Royale",
      img: "https://cdn-icons-png.flaticon.com/512/1166/1166970.png",
    },
  ];

  return (
    <section id="games" className="game-showcase">
      <h3>Jogos Populares</h3>
      <div className="games-grid">
        {games.map((g) => (
          <div
            key={g.name}
            className={`game-card ${selectedGame === g.name ? "active" : ""}`}
            onClick={() => onSelectGame(g.name)}
            style={{
              cursor: "pointer",
              border: selectedGame === g.name ? "2px solid gold" : "2px solid transparent",
              transition: "border 0.3s",
            }}
          >
            <img src={g.img} alt={g.name} />
            <h4>{g.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
