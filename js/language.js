function help_changeLanguage() {
    var languageSelect = document.getElementById("languageSelect");
    var selectedLanguage = languageSelect.value;

    if (selectedLanguage === "en") {
        window.location.href = "help(en).html"; // 跳转到同一文件夹下的help(en).html页面
    }
    else if (selectedLanguage === "cn") {
        window.location.href = "help(cn).html"; // 跳转到同一文件夹下的help(cn).html页面
    }
}

function home_changeLanguage() {
    var languageSelect = document.getElementById("languageSelect");
    var selectedLanguage = languageSelect.value;
    language = document.getElementById("languageSelect").value;

    if (selectedLanguage === "en") {
        window.location.href = "en.html"; // 跳转到同一文件夹下的en.html页面
    }
    else if (selectedLanguage === "cn") {
        window.location.href = "index.html"; // 跳转到同一文件夹下的index.html页面
    }
}

