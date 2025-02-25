import './PlayerCard.css'; 

const PlayerCard = ({ player }) => {
  return (
    <div className="player-card">
      <img src={player.img} alt={player.name} className="player-image" />
      <p>{player.name}</p>
    </div>
  );
};

export default PlayerCard;
