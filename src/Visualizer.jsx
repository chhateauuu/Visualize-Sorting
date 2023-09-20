import React from 'react';
import './Visualizer.css';
import { mergeSortAnimations, quickSortAnimations, heapSortAnimations, bubbleSortAnimations } from './Algorithms';

export default class Visualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            showModal: false
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        const maxBarHeight = 0.7 * window.innerHeight;
        for (let i = 0; i < 190; i++) {
            array.push(randomIntFromInterval(5, maxBarHeight));
        }
        this.setState({ array });
    }
    

async mergeSort() {
    const animations = mergeSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');
    
    for (let i = 0; i < animations.length; i++) {
        const isColorChange = animations[i][2];
        if (isColorChange) { 
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = 'rgb(243, 104, 104)';
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            }, i * 0.5);
        } else { 
            setTimeout(() => {
                const [barIdx, newHeight] = animations[i];
                const barStyle = arrayBars[barIdx].style;
                barStyle.height = `${newHeight}px`;
                barStyle.backgroundColor = 'turquoise';  
            }, i * 0.5);
        }
        await new Promise(resolve => setTimeout(resolve, 0.5));
    }

    setTimeout(() => {
        for (let bar of arrayBars) {
            bar.style.backgroundColor = 'turquoise';
        }
    }, animations.length * 0.5);
}

async quickSort() {
    const animations = quickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
        const isColorChange = animations[i][2];
        if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 2 === 0 ? 'rgb(243, 104, 104)' : 'turquoise';
            await new Promise(resolve => 
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                    resolve();
                }, 0.5)
            );
        } else {
            const [barIdx, newHeight] = animations[i];
            const barStyle = arrayBars[barIdx].style;
            await new Promise(resolve => 
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                    resolve();
                }, 0.5)
            );
        }
    }

    for (let i = 0; i < arrayBars.length; i++) {
        const barStyle = arrayBars[i].style;
        await new Promise(resolve => 
            setTimeout(() => {
                barStyle.backgroundColor = 'rgb(243, 104, 104)';
                resolve();
            }, 0.5)
        );
    }
    await new Promise(resolve => 
        setTimeout(() => {
            for (let j = 0; j < arrayBars.length; j++) {
                const barStyle = arrayBars[j].style;
                barStyle.backgroundColor = 'turquoise';
            }
            resolve();
        }, 0.5)
    );

    this.setState({ array: this.state.array });
}

    
    async heapSort() {
        const animations = heapSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = animations[i][2];
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 2 === 0 ? 'rgb(243, 104, 104)' : 'turquoise';
                await new Promise(resolve => 
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                        resolve();
                    }, 0.5)
                );
            } else {
                const [barIdx, newHeight] = animations[i];
                const barStyle = arrayBars[barIdx].style;
                await new Promise(resolve => 
                    setTimeout(() => {
                        barStyle.height = `${newHeight}px`;
                        resolve();
                    }, 0.5)
                );
            }
        }
        this.setState({ array: this.state.array });
    }
    
    async bubbleSort() {
        const animations = bubbleSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = animations[i][2];
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 2 === 0 ? 'rgb(243, 104, 104)' : 'turquoise';
                await new Promise(resolve => 
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                        resolve();
                    }, 0.001)
                );
            } else {
                const [barIdx, newHeight] = animations[i];
                const barStyle = arrayBars[barIdx].style;
                await new Promise(resolve => 
                    setTimeout(() => {
                        barStyle.height = `${newHeight}px`;
                        resolve();
                    }, 0.001)
                );
            }
        }
        this.setState({ array: this.state.array });
    }
    





    toggleModal() {
        this.setState(prevState => ({ showModal: !prevState.showModal }));
    }

    handleSort() {
        const selectedMethod = document.getElementById("sortingMethodDropdown").value;
        switch (selectedMethod) {
            case "mergeSort":
                this.mergeSort();
                break;
            case "quickSort":
                this.quickSort();
                break;
            case "heapSort":
                this.heapSort();
                break;
            case "bubbleSort":
                this.bubbleSort();
                break;
            default:
                console.error("Unexpected sorting method selected.");
                break;
        }
    }

    render() {
        const { array } = this.state;
        const barWidth = (window.innerWidth - (array.length * 2) - 20) / array.length;

        return (
            <div className="array-container">
                <div className="bars-container">
                    {array.map((value, idx) => (
                        <div className="array-bar" key={idx} style={{ height: `${value}px`, width: `${barWidth}px` }}></div>
                    ))}
                </div>
                
                <div className="buttons-container">
                    <button onClick={() => this.resetArray()}>Randomize</button>
                    <select id="sortingMethodDropdown">
                        <option value="heapSort">Heap Sort</option>
                        <option value="mergeSort">Merge Sort</option>
                        <option value="quickSort">Quick Sort</option>
                        <option value="bubbleSort">Bubble Sort</option>
                    </select>
                    <button onClick={() => this.handleSort()}>Sort</button>
                    <button onClick={() => this.toggleModal()}>What is this?</button>
                </div>

                {this.state.showModal && (
                    <div className="modal">
                    <div className="modal-content">
                        <span className="close-btn" onClick={() => this.toggleModal()}>&times;</span>
                        <h3>What is this?</h3>
                        <p>I have created a sorting visualizer.</p>
                        <p>In computer science, sorting refers to arranging data in a particular order: ascending or descending.</p>
                        <ul>
                            <li><strong>Heap Sort:</strong> A comparison-based sorting method that divides its input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element and moving that to the sorted region.</li>
                            <li><strong>Merge Sort:</strong> A divide-and-conquer algorithm that divides the unsorted list into n sub-lists, each containing one element, and then repeatedly merges sub-lists to produce new sorted sub-lists until there is only one sub-list remaining.</li>
                            <li><strong>Quick Sort:</strong> A divide-and-conquer algorithm that works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.</li>
                            <li><strong>Bubble Sort:</strong> A simple comparison-based algorithm in which each pair of adjacent elements is compared and the elements are swapped if they are in the wrong order. This procedure is repeated until the list is sorted.</li>
                        </ul>
                        <p>I crafted this visualizer on the React framework, seamlessly integrating the intricate algorithms of JavaScript to weave the logic and UI together into a symphony of interactive visualization.</p>
                    </div>
                </div>
                
                )}
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
