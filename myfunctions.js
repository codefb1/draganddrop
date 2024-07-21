    
    // initializ the box count
    let boxCount = 1; 

    function addBox() {
    //trouver le plus grand numbre de box 
    let highestBoxNumber = 0;

    // Check boxes in the box container
    const boxContainer = document.getElementById('boxContainer');
    if (boxContainer.children.length > 0) {
        const boxIds = Array.from(boxContainer.children).map(box => parseInt(box.id.slice(3)));
        highestBoxNumber = Math.max(...boxIds);
    }

  
    const placeholder = document.getElementById('placeholder');
    if (placeholder.children.length > 0) {
        const placeholderBoxId = placeholder.firstChild.id;
        const placeholderBoxNumber = parseInt(placeholderBoxId.slice(3));
        highestBoxNumber = Math.max(highestBoxNumber, placeholderBoxNumber);
    }

  
    const newBoxNumber = highestBoxNumber + 1;

  
    const newBoxId = `box${newBoxNumber}`;
    const newBox = `
        <div id="${newBoxId}" class="bg-white w-96 h-80 rounded-lg mb-4"
            style="border: 1px solid #DDDDDD;"  ondragover="allowDrop(event)" ondrop="dropItem(event)">
            <div class="p-2 grid grid-cols-3 rounded-t-lg relative"
                style="border-bottom: 1px solid #DDDDDD;">
                <button class="ml-2 w-2" id="dropbox${newBoxNumber}" onclick="dropBox('${newBoxId}')">
                    <img src="arrow.svg" alt="arrow">
                </button>
                <button class="ml-2 w-2" id="back${newBoxNumber}" onclick="backBox('${newBoxId}')"
                    style="display:none">
                    <img src="arrow.svg" style="rotate:180deg" alt="arrow">
                </button>
                <span class="justify-center">Box number ${newBoxNumber}</span>
                <button class="absolute mt-3 w-4 right-3" id="deletebuton${newBoxNumber}" onclick="deleteBox('${newBoxId}')">
                    <img src="delete.svg" alt="">
                </button>
            </div>
        </div>
    `;

   
    document.getElementById('addBoxButton').insertAdjacentHTML('afterend', newBox);

    
    boxCount++;
    document.getElementById('boxCount').innerText = boxCount;
}

       
        function deleteBox(boxId) {
    const box = document.getElementById(boxId);
    if (box) {
        // find the items in the box 
        const items = box.querySelectorAll('.item');
        items.forEach(item => {
            const itemId = item.id;
            returnItem(itemId); // return each item to the itemcontainer
        });

       
        box.remove();
        boxCount--;

        // update the count of the box 
        document.getElementById('boxCount').innerText = boxCount;

   
        if (boxCount === 0) {
            document.getElementById('boxCount').innerText = 0;
        }
    }
}


        // function to handle dropping a box
        function dropBox(boxId) {
    const box = document.getElementById(boxId);
    const placeholder = document.getElementById('placeholder');
    const boxCountElement = document.getElementById('boxCount');

    if (box && placeholder) {
      
        if (placeholder.children.length > 0) {
       
            placeholder.classList.add('placeholder-error');

            setTimeout(() => {
                alert("Placeholder already contains a box. You can only drop one box at a time.");
            }, 0); 
           
            setTimeout(() => {
                placeholder.classList.remove('placeholder-error');
            }, 500); 

            return;
        }

        
        if (box.children.length > 0) {
            
            Array.from(box.getElementsByClassName('item')).forEach(item => {
                const itemId = item.id;
                const itemNumber = itemId.replace('item', ''); // Extract item number

                
                const addItemButton = document.getElementById(`additem${itemNumber}`);
                const deleteItemButton = document.getElementById(`deleteitem${itemNumber}`);
                const likeItemButton = document.getElementById(`likeitem${itemNumber}`);
                const dropItemButton = document.getElementById(`dropitem${itemNumber}`);

                if (addItemButton && deleteItemButton && likeItemButton && dropItemButton) {
                    addItemButton.style.display = 'none'; 
                    deleteItemButton.style.display = 'block'; 
                    likeItemButton.style.display = 'none';
                    dropItemButton.style.backgroundColor = '#c9363699'; 
                }
            });
        }

        // create a clone of the box element
        const clonedBox = box.cloneNode(true);

        // append the cloned box to the placeholder
        placeholder.innerHTML = ''; 
        placeholder.appendChild(clonedBox);

        
        placeholder.classList.add('placeholder-hidden');

      
        const dropboxButton = document.getElementById(`dropbox${boxId.slice(3)}`);
        const backButton = document.getElementById(`back${boxId.slice(3)}`);
        if (dropboxButton && backButton) {
            backButton.style.display = 'block';
            dropboxButton.style.display = 'none';
        }

      
        const deleteButton = document.getElementById(`deletebuton${boxId.slice(3)}`);
        if (deleteButton) {
            deleteButton.style.display = 'none';
        }

        
        box.remove();

        boxCount--;
        boxCountElement.innerText = boxCount;
    }
}


        // function to handle backing a box from placeholder to box container
        function backBox(boxId) {
    const placeholder = document.getElementById('placeholder');
    const boxContainer = document.getElementById('boxContainer');
    const boxCountElement = document.getElementById('boxCount');

    if (placeholder && boxContainer) {
        const clonedBox = placeholder.firstChild;

        if (clonedBox) {
           
            Array.from(clonedBox.getElementsByClassName('item')).forEach(item => {
                const itemId = item.id;
               
                const itemNumber = itemId.slice(4); 
                const addItemButton = document.getElementById(`additem${itemNumber}`);
                const deleteItemButton = document.getElementById(`deleteitem${itemNumber}`);
                const likeItemButton = document.getElementById(`likeitem${itemNumber}`);
                const dropItemButton = document.getElementById(`dropitem${itemNumber}`);

                if (addItemButton && deleteItemButton && likeItemButton && dropItemButton) {
                    addItemButton.style.display = 'none';
                    deleteItemButton.style.display = 'none'; 
                    likeItemButton.style.display = 'block'; 
                    dropItemButton.style.backgroundColor = '#2196f359'; 
                }
            });

            
            placeholder.innerHTML = '';

            
            boxContainer.appendChild(clonedBox);

         
            const boxNumber = boxId.slice(3); 
            const dropboxButton = document.getElementById(`dropbox${boxNumber}`);
            const backButton = document.getElementById(`back${boxNumber}`);
            if (dropboxButton && backButton) {
                dropboxButton.style.display = 'block';
                backButton.style.display = 'none';
            }

            
            const deleteButton = document.getElementById(`deletebuton${boxNumber}`);
            if (deleteButton) {
                deleteButton.style.display = 'block';
            }

            boxCount++;
            boxCountElement.innerText = boxCount;
        }

       
        placeholder.classList.remove('placeholder-hidden');
    }
}

// function to update the number of items count
function updateItemCount() {
    const itemContainer = document.getElementById('itemcontainer');
    const itemCount = itemContainer.children.length;
    document.getElementById('numitem').textContent = itemCount;
}
//functon to add an item to a box
function addItemToBox(itemId) {
    const item = document.getElementById(itemId); // Find the item
    const placeholder = document.getElementById('placeholder');

    if (item && placeholder.children.length > 0) {
        const box = placeholder.firstChild; 

  
        box.appendChild(item);

        
        item.style.margin = '4%';

       
        const itemNumber = itemId.replace('item', '');

        
        const addItemButton = document.getElementById(`additem${itemNumber}`);
        const deleteItemButton = document.getElementById(`deleteitem${itemNumber}`);
        const likeItemButton = document.getElementById(`likeitem${itemNumber}`);
        const dropItemButton = document.getElementById(`dropitem${itemNumber}`);

      
        if (addItemButton && deleteItemButton && likeItemButton && dropItemButton) {
            addItemButton.style.display = 'none'; // Hide add item button
            deleteItemButton.style.display = 'block'; // Show delete item button
            likeItemButton.style.display = 'none'; // Hide like item button
            dropItemButton.style.backgroundColor = '#c9363699'; // Change background color of drop item button
        }

        
        updateItemCount();
    }
}



// function to allow dropping items into the box
function allowDrop(event) {
    const placeholder = document.getElementById('placeholder');
  
    if (placeholder.children.length > 0) {
        event.preventDefault(); 
    } else {
        event.preventDefault(); 
    }
}

// function to handle dropping an item into the box
function dropItem(event) {
    const placeholder = document.getElementById('placeholder');
   
    if (placeholder.children.length > 0) {
        event.preventDefault();
        const itemId = event.dataTransfer.getData('text/plain');
        const item = document.getElementById(itemId);
        
       
        placeholder.firstChild.appendChild(item);

        item.style.margin = '4%';

       
        const itemNumber = itemId.replace('item', '');

      
        const addItemButton = document.getElementById(`additem${itemNumber}`);
        const deleteItemButton = document.getElementById(`deleteitem${itemNumber}`);
        const dropItemButton = document.getElementById(`dropitem${itemNumber}`);

      
        if (addItemButton && deleteItemButton && dropItemButton) {
            addItemButton.style.display = 'none';  // Hide additem
            deleteItemButton.style.display = 'block';  // Show deleteitem
            dropItemButton.style.backgroundColor = '#c9363699';  // Change background color to red
        }

    
        updateItemCount();
    }
}


// Function to handle dragging an item (start dragging)
function dragItem(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

      
        document.getElementById('addBoxButton').addEventListener('click', addBox);
// function to return an item to the #itemcontainer
function returnItem(itemID) {
    const item = document.getElementById(itemID);

    if (item) {
        const itemContainer = document.getElementById('itemcontainer');

        // Check if the item is already in the itemContainer
        if (!itemContainer.contains(item)) {
           
            itemContainer.appendChild(item); 
            item.style.marginLeft = '0%';
        
            const addItemButton = document.getElementById(`additem${itemID.slice(4)}`);
            const deleteItemButton = document.getElementById(`deleteitem${itemID.slice(4)}`);
            const likeItemButton = document.getElementById(`likeitem${itemID.slice(4)}`);
            const dropItemButton = document.getElementById(`dropitem${itemID.slice(4)}`);

            if (addItemButton && deleteItemButton && likeItemButton && dropItemButton) {
                addItemButton.style.display = 'block'; // Show add item button
                deleteItemButton.style.display = 'none'; // Hide delete item button
                likeItemButton.style.display = 'none'; // Hide like item button
                dropItemButton.style.backgroundColor = '#4caf505c'; // Reset background color

            }

         
            updateItemCount();
        }
    }
}

// initial count of items on page load
updateItemCount();
