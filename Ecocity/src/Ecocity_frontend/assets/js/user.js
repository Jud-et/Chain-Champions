document.getElementById('upload-image').addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const imgElement = document.getElementById('profile-img');
        imgElement.src = reader.result; // Change the source of the image to the uploaded image
    }
    reader.readAsDataURL(event.target.files[0]); // Read the uploaded file
});

function editName() {
    document.getElementById('user-name').style.display = 'none';
    document.getElementById('name-input').style.display = 'block';
    document.querySelector('.edit-name-btn').style.display = 'none';
    document.querySelector('.save-name-btn').style.display = 'inline-block';
}

function saveName() {
    const newName = document.getElementById('name-input').value;
    document.getElementById('user-name').textContent = newName;
    document.getElementById('user-name').style.display = 'block';
    document.getElementById('name-input').style.display = 'none';
    document.querySelector('.edit-name-btn').style.display = 'inline-block';
    document.querySelector('.save-name-btn').style.display = 'none';
}
