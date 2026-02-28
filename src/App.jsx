import React, { useEffect } from "react";
import "./App.css";
import Header from "./header";
// import meme1 from "../src/images/img.png";

function App() {
  const [meme, setMeme] = React.useState({
    //the topText and the bottomText will get its value from the input fields,
    //  and the image will get its value from the api
    topText: "One does not simply",
    bottomText: "walk into mordor",
    image: "http://i.imgflip.com/1bij.jpg",
  });
  const [count, setcount] = React.useState(0);

  //here i will get the image from imgflip by useeffect,
  // and every time i click the button Get a new meme image 🖼 will change the image

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        const memesArray = data.data.memes;
        const randomIndex = Math.floor(Math.random() * memesArray.length);
        const randomMeme = memesArray[randomIndex];
        setMeme((prevMeme) => ({
          ...prevMeme,
          image: randomMeme.url,
        }));
      });
  }, [count]);

  function getNewMeme() {
    setcount((prevCount) => prevCount + 1);
  }

  //function to handle input changes
  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <>
      <Header />
      <main>
        <div className="form">
          <label>
            Top text
            <input
              type="text"
              name="topText"
              placeholder="Top text"
              onChange={handleChange}
            />
          </label>
          <label>
            Bottom text
            <input
              type="text"
              name="bottomText"
              placeholder="Bottom text"
              onChange={handleChange}
            />
          </label>
        </div>
        <button onClick={getNewMeme}>Get a new meme image 🖼</button>
        <div className="meme">
          <img src={meme.image} alt="meme" className="meme-image" />
          <span className="top-text">{meme.topText}</span>
          <span className="bottom-text">{meme.bottomText}</span>
        </div>
      </main>
    </>
  );
}

export default App;
