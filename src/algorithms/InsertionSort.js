
const InsertionSort = (array, position, arraySteps, colorSteps) => {
    let colorKey = colorSteps[colorSteps.length - 1].slice();

    for (let i = 1; i < array.length; i++) {
        let temp = array[i];
        let j = i - 1;
        arraySteps.push(array.slice());
        colorKey[i] = 1;
        colorKey[j] = 1;
        colorSteps.push(colorKey.slice());
        colorKey[j] = 0;
        colorKey[i] = 0;

        while (j >= 0 && array[j] > temp) {
            array[j+1] = array[j];
            arraySteps.push(array.slice());
            colorKey[i] = 1;
            colorKey[j+1] = (i === j) ? 1 : 3;
            colorKey[j] = 3;
            colorSteps.push(colorKey.slice());
            colorKey[j] = 0;
            colorKey[i] = 0;
            colorKey[j+1] = 0;
            j--;
        }
        array[j+1] = temp;
    }
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());
    colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
}

export default InsertionSort;
