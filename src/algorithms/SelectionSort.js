import { swap } from './Helpers'

const SelectionSort = (array, position, arraySteps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();

    for (let i = 0; i < array.length - 1; i++) {
        let min = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[min]) {
                min = j;
            }
            arraySteps.push(array.slice());
            colorKey[i] = 1;
            colorKey[j] = 1;
            colorSteps.push(colorKey.slice());
            colorKey[i] = 0;
            colorKey[j] = 0;
           
        }
        arraySteps.push(array.slice());
        colorKey[min] = 3;
        colorSteps.push(colorKey.slice());
        colorKey[min] = 0;
        swap(array, i, min);
        colorKey[i] = 2;       
    }
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());
    colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
    return;
}

export default SelectionSort;