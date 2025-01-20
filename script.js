/* Algemene styling */
body {
  font-family: 'Arial', sans-serif;
  text-align: center;
  background-color: #fefae0;
  margin: 0;
  padding: 0;
}

h1 {
  color: #d62828;
  margin-top: 20px;
}

p {
  font-size: 1.2em;
  color: #6c757d;
  margin-bottom: 20px;
}

/* Speelbord */
#game-board {
  display: grid;
  grid-template-columns: repeat(5, 120px);
  grid-gap: 10px;
  justify-content: center;
  margin: 0 auto;
}

.card {
  position: relative;
  width: 120px;
  height: 120px;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card.flipped {
  transform: rotateY(180deg);
}

/* Voor- en achterkant van de kaart */
.card .front,
.card .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* Zorgt ervoor dat de achterkant niet in spiegelbeeld is */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-size: 1.2em;
  font-weight: bold;
}

.card .front {
  background-color: #f4a261;
  color: transparent; /* Tekst verborgen aan de voorkant */
}

.card .back {
  background-color: #2a9d8f;
  color: white;
  transform: rotateY(180deg); /* Alleen de achterkant wordt omgedraaid */
}
