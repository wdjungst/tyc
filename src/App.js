import React, { Component } from 'react';
import { Image } from 'semantic-ui-react'
function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

class App extends Component {
  state = { images: [], image: 0 }

  componentDidMount() {
    this.setState({ images: shuffle(Object.values(images)) }, () => {
      this.id = setInterval(this.updateImage, 2000)
    })
  }

  updateImage = () => {
    const { image } = this.state
    let index = image
    if (image === images.length)
       index = 0
    else
      index = index + 1

    this.setState({ image: index })
  }

  render() {
    const { images, image } = this.state
    return (
      <div className="App">
        { images.length > 0 && <Image src={images[image]} /> }
      </div>
    );
  }
}

export default App;
