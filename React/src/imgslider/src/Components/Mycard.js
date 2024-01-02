import React from "react";
import "./Mycard.css";

{
  /* Second scrooling from chat gpt*/
}
const Mycard = () => {
  const btnpressprev = () => {
    let box = document.querySelector(".product-container");
    let height = box.clientHeight;
    box.scrollTo({
      top: box.scrollTop - height,
      left: 0,
      behavior: "smooth",
    });
  };

  const btnpressnext = () => {
    let box = document.querySelector(".product-container");
    let height = box.clientHeight;
    box.scrollTo({
      top: box.scrollTop + height,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="mycard">
        {/* {props.cardno} */}
        <div className="slide active">
          <div className="card">
            <div className="card__img" id="img01"></div>
            <div className="card__content">
              <h2 className="card__content-header">Anushka Sharma</h2>
              <h3 className="age">Age : 23</h3>
              <p className="card__content-paragraph">
                Memoroies just for the two of us
                <br />
                Let's Make it💗
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mycard">
        {/* Mycard No. {props.cardno} */}
        <div className="slide">
          <div className="card">
            <div className="card__img" id="img05"></div>
            <div className="card__content">
              <h2 className="card__content-header">Ketika Sharma</h2>
              <h3 className="age">Age : 24</h3>
              <p className="card__content-paragraph">
                Cannot be nominated
                <br />
                🤟because it is in training.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mycard">
        {/* Mycard No. {props.cardno} */}
        <div className="slide">
          <div className="card">
            <div className="card__img" id="img03"></div>
            <div className="card__content">
              <h2 className="card__content-header">Saiyami Kher</h2>
              <h3 className="age">Age : 23</h3>
              <p className="card__content-paragraph">
                If you take the lead, I'll
                <br />
                💘 rely on you.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mycard">
        {/* Mycard No. {props.cardno} */}
        <div className="slide">
          <div className="card">
            <div className="card__img" id="img04"></div>
            <div className="card__content">
              <h2 className="card__content-header">Jiya Shankar</h2>
              <h3 className="age">Age : 25</h3>
              <p className="card__content-paragraph">
                If you're not good at dating, leave it
                <br />
                🥰 to me.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mycard">
        {/* Mycard No. {props.cardno} */}
        <div className="slide">
          <div className="card">
            <div className="card__img" id="img02"></div>
            <div className="card__content">
              <h2 className="card__content-header">Kriti Rautela</h2>
              <h3 className="age">Age : 23</h3>
              <p className="card__content-paragraph">Tell me what you like 💕</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mycard">
        {/* Mycard No. {props.cardno} */}
        <div className="slide">
          <div className="card">
            <div className="card__img" id="img06"></div>
            <div className="card__content">
              <h2 className="card__content-header">Krithi Shetty</h2>
              <h3 className="age">Age : 20</h3>
              <p className="card__content-paragraph">
                If you're not good at dating, leave it
                <br />
                🥰 to me.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="action-buttons">
        <button className="up-button" id="prev" onClick={btnpressprev}></button>
        <button
          className="down-button"
          id="next"
          onClick={btnpressnext}
        ></button>
      </div>
    </>
  );
};

export default Mycard;
