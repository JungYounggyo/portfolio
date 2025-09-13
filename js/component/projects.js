export function createProjectComponent(imageUrl, title, languages, index, url) {
    let projectWrapper = document.createElement("div");
    projectWrapper.className = "project";
    projectWrapper.setAttribute("data-index", index);

    // 좌측: 텍스트
    let left = document.createElement("div");
    left.className = "project-left";

    let projectTitle = document.createElement("p");
    projectTitle.className = "project-title";
    projectTitle.textContent = title;

    let languageList = document.createElement("div");
    languageList.className = "language-list";
    languages.forEach(lang => {
        let li = document.createElement("p");
        li.textContent = lang;
        languageList.appendChild(li);
    });

    left.appendChild(projectTitle);
    left.appendChild(languageList);

    // 우측: 이미지
    let right = document.createElement("a");
    right.className = "project-right";
    right.href = url;
    right.target = "_blank";

    let img = document.createElement("img");
    img.src = imageUrl;
    img.alt = title;

    right.appendChild(img);

    projectWrapper.appendChild(left);
    projectWrapper.appendChild(right);

    return projectWrapper;
}