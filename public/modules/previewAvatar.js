export function readImage(file) {
    const img = document.getElementById('preview');
    img.classList.add('avatar');
    console.log('readImage');
    const reader = new FileReader();
    let avatar;
    reader.addEventListener('load', (event) => {
        img.src = event.target.result;
        avatar = reader.result;
        console.log(avatar);
    });
    reader.readAsDataURL(file);
    // console.log(avatar.width);
}