// CREATE EMPTY ARRAY.

// Array will collect the dices values (5 dices - 5 items).
let dicesCollection = [];


// DICES VALUES.

// Make the array empty
const cleanDicesCollection = () => {
  dicesCollection = [];
};

// Roll the dices.
const rollDices = arr => {
  // Six times...
  for(let i = 0; i < 5; i++) {
    // Generate the random number between 1 and 6.
    let dicePoints = Math.ceil(Math.random() * 6);
    // Add the number to the "dicesCollection" array.
    arr.push(dicePoints);
  }
};

// Sum points of all dices.
const sumPoints = arr => {
  let initVal = 0;
  let sumWithInit = arr.reduce((prevVal, curVal) => prevVal + curVal, initVal);

  return sumWithInit;
};


// DETERMINE CAREGORY.

// Sort the array items from hightest to lowest.
const sortFromHigh = arr => arr.sort((a, b) => b - a);

// Find same numbers.
// Below function returns 4 digit sequence of 0 and 1.
// Based on the values form 'sortFromHigh' array, if the next array item is equal to current array item...
// ...the digit value is 1. If the current array item is not equel to the next array item the digit value is 0.
// Digits are singly pushed to the 'binarMachCollection' array.
const checkForMatch = arr => {
  let sortedArray = sortFromHigh(arr);
  let binarMachCollection = [];

  for(let i = 0; i < arr.length - 1; i++) {
    if (sortedArray[i] === sortedArray[i + 1]) {
      binarMachCollection.push(1);
    } else {
      binarMachCollection.push(0);
    }
  }

  return binarMachCollection;
};

// Determine cotegory from dices.
const determineCategory = arr => {
  let binaryMatch = checkForMatch(arr).join('');

  // Posibilities
  let onePair = ['1000', '0100', '0010', '0001'];
  let twoPairs = ['1010', '0101', '1001'];
  let threeOfAKind = ['1100', '0110', '0011'];
  let fullHouse = ['1101', '1011'];
  let fourOfAKind = ['1110', '0111'];
  let poker = ['1111'];
  let other = ['0000']; // Small Straight, Large Straight or nothing (no match).
  
  if (poker.includes(binaryMatch)) {
    return 'Poker';
  } else if (fourOfAKind.includes(binaryMatch)) {
    return 'Four Of A Kind';
  } else if (fullHouse.includes(binaryMatch)) {
    return 'Full House';
  } else if (threeOfAKind.includes(binaryMatch)) {
    return 'Three Of A Kind';
  } else if (twoPairs.includes(binaryMatch)) {
    return 'Two Pairs';
  } else if (onePair.includes(binaryMatch)) {
    return 'One Pair';
  } else if (other.includes(binaryMatch)) {
      if (sumPoints(arr) === 15) {  //Small Straight.
        return 'Small Straight';
      } else if (sumPoints(arr) === 20) { //Large Straight.
        return 'Large Straight';
      } else {  // No match.
        return 'Keep Rolling';
      }
  }
};


// MANIPULATE DOM.

// Clean the old dices elements from DOM.
const cleanDices = () => {
  let dicesContainer = document.getElementById('dices-container'); // Get dices container.
  dicesContainer.innerHTML = ''; // Clean container form all content.
};

// Add new dices elements to the DOM.
const addDices = arr => {
  let dicesContainer = document.getElementById('dices-container'); // Get dices container.

  arr.forEach(element => {
    let diceTemplate = document.createElement('div'); // Create new 'div' element.
    diceTemplate.setAttribute('class', 'dice'); // Add class with value to the new 'div.
    diceTemplate.classList.add(`dice${element}`) // Add new class to the 'div'.
    dicesContainer.append(diceTemplate); // Append 'div' element to the container.
    
    // Depends on the value of dice, create the number of dots.
    for (let i = 0; i < element; i++) { 
      let innerDiv = document.createElement('div');
      innerDiv.setAttribute('class', 'dot');
      diceTemplate.append(innerDiv);
    }
  });
};

// Update the number of total points in DOM.
const setPoints = (num) => {
  const pointsElement = document.getElementById('points');
  pointsElement.innerText = num;
};

// Update the dices category.
const setCategory = (str) => {
  const categoryElement = document.getElementById('category');
  categoryElement.textContent = str;
}


// EVENT LISTENER.

// Get the "roll" button element.
const rollButton = document.getElementById('roll-button');

// Handle click on the button.
const handleOnClick = arr => {
  cleanDicesCollection();  // Clean the array.
  rollDices(arr); // Call "rollDices" function.
  cleanDices(); // Clean DOM area for new dices.
  addDices(arr)  // Add new dices.
  setPoints(sumPoints(arr));
  setCategory(determineCategory(arr));
};

// Add event listener to the "rollButton".
rollButton.addEventListener('click', function() {
  handleOnClick(dicesCollection);
});