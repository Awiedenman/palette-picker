*{
  box - sizing: border - box;
  margin: 0;
  padding: 0;
  font - family: 'Montserrat',
  sans - serif;
}

body {
  background: #efefef;
  width: 100 vw;
}

select {
  height: 36 px;
  width: 80 px;
}

header {
  background - color: rgba(34, 30, 29, 0.938);

}

main {
  background - color: rgba(216, 216, 216, 0.808);
  padding: 30 px 20 px;

}

.main - title {
    height: 105 px;
    color: rgba(255, 255, 255, 0.808);
    font - size: 50 px;
    margin: 0;
    padding: 27 px 20 px;
  }

  .palette - icon {
    height: 74 px;
    width: 82 px;
    background - image: url(. / images / color - palette.svg);
    background - repeat: no - repeat;
    position: absolute;
    top: 17 px;
    right: 21 px;
  }

  .hex {
    text - align: center;
    margin - top: 265 px;
    background - color: #efefefa6;
  }

  .box {
    display: inline - block;
    height: 350 px;
    width: calc(23 % -32 px);
    box - shadow: 1 px 1 px 1 px 0.15 px;
  }

  .palette {
    margin: 0 auto;
    display: flex;
    justify - content: center;

  }
  .palette - generate - button {
    display: flex;
    margin: 20 px auto 35 px;
    padding: 13 px 72 px;
  }

  .new - palette - input {
    height: 40 PX;
    width: 429 px;
  }
  .new - palette - form {
    display: block;
    padding: 30 px 30 px 20 px;
    width: 50 % ;
    margin: 0 auto;
  }

  .new - project - form {
    display: flex;
    justify - content: center;
    padding: 45 px 30 px 30 px 30 px;
    border - top: 5 px solid #000;
  text-align: center;
}


.unlocked-btn {
  background-image: url("./images/unlock.svg");
  margin: 18px auto;
  height: 30px;
  width: 30px;
  padding-bottom: 20px;
}

.unlocked-btn:hover {
  background-image: url("./images/unlock.svg");
  height: 40px;
  width: 40px;
}

.locked {
  background-image: url("./images/lock.svg");
  margin: 18px auto;
  height: 30px;
  width: 30px;
  padding-bottom: 20px;
}

.locked:hover {
  background-image: url("./images/lock.svg");
  height: 40px;
  width: 40px;
}

.palette-container {
  background: # fff;
    padding: 10 px;
    box - shadow: 0 5 px 15 px rgba(0, 0, 0, .1)
  }
  .save - palette - container {
    width: 285 px;
    margin: 0 auto;
  }
  .saved - palette {
    position: relative;
    margin: 0 auto;
    height: 50 px;
    width: 40 % ;
    border: 1 px black solid;

  }

  .save - palette {
    border - radius: 20 px;
    width: 100 % ;
    height: 38 px;
    margin - bottom: 42 px;
  }

  .saved - palette - color {
    display: inline - block;
    border: black solid 2 px;
    height: 60 px;
    width: 60 px;
    padding: 10 px 10 px 10 px 10 px;
    text - align: center;
    vertical - align: middle;
    line - height: 60 px;
    color: transparent;
    transition: 0.5 s ease;
  }
  .saved - palette - color: hover {
    color: black;
  }

  .trash - icon {
    display: inline - block;
    vertical - align: middle;
    padding: 8 px;
    height: 20 px;
    width: 20 px;
    background - image: url(. / images / close - button.svg);
    background - repeat: no - repeat;
    background - size: cover;
    margin: 30 px 0 0 10 px;
  }

  .trash - icon: hover {
    background - image: url(. / images / hover - close - button.svg);
  }

  .delete - btn {
    position: absolute;
  }

  .page - container {
    display: flex;
    flex - wrap: wrap;
  }

  .project - container {
    width: 600 px;
    max - width: 100 % ;
    margin: auto;
  }

  .new - project - btn {
    width: 84 px;
    padding: 4 px;
  }

  .new - project - input {
    width: 275 px;
    padding: 4 px;
  }

label {
  font - size: 20 px;
  /* font-weight: bolder; */
}
