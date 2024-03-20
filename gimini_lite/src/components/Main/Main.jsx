import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

function Main() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>GeMini Lite</p>
        <img src={assets.user_icon} />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello , Akhand...</span>
              </p>
              <p>I am your GeMini Lite , How can I help You.</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip.</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Brifly summarize this concept: Context API.</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Write A letter to the principal for sick leave</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>How To hack the Google</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} />
              <p className="question">{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <div>
                  <p dangerouslySetInnerHTML={{ __html: resultData }}>
                    {/* {resultData} */}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} />
              <img src={assets.mic_icon} />
              {input?<img onClick={() => onSent()} src={assets.send_icon} />:<></>}
            </div>
          </div>
          <p className="bottom-info">
            GeMini Lite may display in acurrate info , including about people,
            so double-check it's responses.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
