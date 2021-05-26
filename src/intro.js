console.log('intro')


const hideInstructions = () => {
    document.querySelector('#start').style = 'display: none;'
}

document.querySelector('#start-button').addEventListener('click', hideInstructions)
// document.querySelector('#ok-button').addEventListener('click', () => {
//     document.querySelector('#instructions').style = 'display: none;'

// })

const URL = "./";

    let model, webcam, labelContainer, maxPredictions;

    // Load the image model and setup the webcam

    console.log('enter')

    document.querySelector('#start-camera').addEventListener('click', init)

    async function init() {

        document.querySelector('#start').style = 'display: none;'

        console.log('start')
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        
        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            if (prediction[i].probability.toFixed(2) > 0.5 && prediction[i].className == 'Coffee') {
                coffee = true;
                document.getElementById('gate1').setAttribute('rotation', '0 90 0')
                document.getElementById('gate1').setAttribute('position', '5.2 -1.6 -7')
                document.getElementById('gate2').setAttribute('rotation', '0 -100 0')
                document.getElementById('gate2').setAttribute('position', '4.9 -1.6 -9.7')

                document.getElementById('instructions2').style = 'display: none;'
                document.getElementById('camera-container').style = 'display: none;'

                document.getElementById('text').innerHTML = 'Thank you, I have now opened the gates for you'
                document.querySelector('#instructions').style = 'display: block;';

                webcam.stop();
            // const classPrediction =
            //     prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            // labelContainer.childNodes[i].innerHTML = classPrediction;
            // character = document.createElement("a-box");
            // character.setAttribute('static-body','');
      
            // character.setAttribute('height',2);
            // character.setAttribute('width',1);
      
            // // character.setAttribute('look-at', '#camera');
            // character.setAttribute('rotation','0 45 10');
            // character.setAttribute('id', 'character');
            // character.setAttribute('on-gaze','');
            // character.setAttribute('position','-25.5 1.2 -20');
            // character.setAttribute('color', 'red')
            // // character.setAttribute('src', '#asset_character');
            // // character.setAttribute('animation-mixer', 'clip: *;')
            // character.setAttribute('shadow', "type: basic")
            // // entity.appendChild(character); 
            // document.getElementById('scene').appendChild(character); 
      
}
        }
    }

