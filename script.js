let typingTimer;
let currentStoryText = ""; 
let historyStack = []; 
let petalInterval; 

// ระบบเซฟประวัติ
function saveState() {
    historyStack.push({
        title: document.getElementById("story-title").innerText,
        text: currentStoryText,
        imgSrc: document.getElementById("story-image").getAttribute("src") || "",
        imgDisplay: document.getElementById("story-image").style.display,
        choicesHTML: document.getElementById("choices").innerHTML,
        isDark: document.body.classList.contains("higanbana-mode")
    });
    document.getElementById("btn-back").style.display = "inline-block";
}

// ระบบย้อนกลับ
function goBack() {
    if (historyStack.length === 0) return; 
    let prevState = historyStack.pop(); 
    
    document.getElementById("story-title").innerText = prevState.title;
    typeText("story-text", prevState.text, 50); // <--- ปรับให้ย้อนกลับก็พิมพ์เร็ว 50 ด้วย
    
    let img = document.getElementById("story-image");
    if(prevState.imgSrc && prevState.imgDisplay !== "none") {
        img.src = prevState.imgSrc;
        img.style.display = "block";
    } else {
        img.style.display = "none";
    }
    
    let choices = document.getElementById("choices");
    choices.innerHTML = prevState.choicesHTML;
    choices.style.display = "block";
    
    if (prevState.isDark) {
        document.body.classList.add("higanbana-mode");
        startPetals();
    } else {
        document.body.classList.remove("higanbana-mode");
        stopPetals();
    }
    
    triggerCinematic("story-image");
    triggerCinematic("choices");
    
    if (historyStack.length === 0) {
        document.getElementById("btn-back").style.display = "none";
    }
}

// ระบบดอกไม้ตก
function startPetals() {
    if(document.getElementById("petal-container").children.length > 0) return; 
    
    petalInterval = setInterval(() => {
        let petal = document.createElement("div");
        petal.classList.add("petal");
        
        petal.style.left = Math.random() * 100 + "vw";
        petal.style.animationDuration = (Math.random() * 3 + 3) + "s"; 
        petal.style.opacity = (Math.random() * 0.5) + 0.3;
        petal.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
        
        document.getElementById("petal-container").appendChild(petal);
        setTimeout(() => { petal.remove(); }, 6000);
    }, 200); 
}

function stopPetals() {
    clearInterval(petalInterval);
    document.getElementById("petal-container").innerHTML = ""; 
}

// 👨‍🏫 สังเกตตรงนี้ครับ: ฟังก์ชันพิมพ์ดีด ความเร็วตั้งไว้ที่ 10 ตามที่คุณต้องการแล้ว
function typeText(elementId, text, speed = 10) {
    currentStoryText = text; 
    let element = document.getElementById(elementId);
    element.innerText = ""; 
    clearInterval(typingTimer); 
    let i = 0;
    typingTimer = setInterval(() => {
        if (i < text.length) {
            element.innerText += text.charAt(i); i++;
        } else { clearInterval(typingTimer); }
    }, speed); 
}

// แอนิเมชันความสมูท
function triggerCinematic(elementId) {
    let element = document.getElementById(elementId);
    element.classList.remove("cinematic-fade"); 
    void element.offsetWidth; 
    element.classList.add("cinematic-fade");
}

// ระบบเล่นเสียงเพลง
function playMusic() {
    let bgm = document.getElementById("bgm");
    if (bgm.paused) { bgm.play(); bgm.volume = 0.3; }
}

// ==========================================
// เส้นทางเนื้อเรื่อง
// ==========================================
function chooseCamellia() {
    saveState(); 
    playMusic(); // <--- เพลงจะเริ่มเล่นตรงนี้! (เมื่อถูกคลิก)
    document.getElementById("story-title").innerText = "ความรักที่สมบูรณ์แบบ";
    typeText("story-text", "คุณยื่นดอกคามิลเลียสีชมพูอ่อนให้เขา บรรยากาศรอบตัวดูอบอุ่นขึ้น... เขาเอื้อมมือมารับดอกไม้นั้นไว้ คุณจะทำอย่างไรต่อไป?");
    document.body.classList.remove("higanbana-mode");
    stopPetals();
    
    let img = document.getElementById("story-image");
    img.src = "br11.png"; 
    img.style.display = "block";
    triggerCinematic("story-image"); 
    
    let choices = document.getElementById("choices");
    choices.innerHTML = `
        <button class="btn-camellia" onclick="endingCamelliaHoldHands()">จับมือเขาไว้</button>
        <button class="btn-camellia" onclick="endingCamelliaSmile()">ยิ้มแล้วเดินเคียงข้างกัน</button>
    `;
    triggerCinematic("choices"); 
}

function endingCamelliaHoldHands() {
    saveState();
    document.getElementById("story-title").innerText = "สัมผัสที่อบอุ่น (ตอนจบ)";
    typeText("story-text", "คุณเอื้อมไปจับมือเขา ความอบอุ่นถ่ายทอดถึงกันโดยไม่ต้องมีคำพูดใดๆ เรื่องราวบทใหม่กำลังจะเริ่มต้นขึ้น...");
    document.getElementById("choices").style.display = "none";
}

function endingCamelliaSmile() {
    saveState();
    document.getElementById("story-title").innerText = "ก้าวเดินต่อไปด้วยกัน (ตอนจบ)";
    typeText("story-text", "คุณส่งยิ้มให้เขา แล้วทั้งสองก็ก้าวเดินออกไปพร้อมกัน ท่ามกลางแสงแดดอ่อนๆ ที่ทอดผ่านเส้นทาง...");
    document.getElementById("choices").style.display = "none";
}

function chooseHiganbana() {
    saveState(); 
    playMusic(); // <--- หรือเพลงจะเริ่มเล่นตรงนี้! (ถ้าเลือกฮิกังบานะ)
    document.getElementById("story-title").innerText = "การจากลาที่งดงาม";
    typeText("story-text", "คุณมอบดอกฮิกังบานะสีแดงสด ท้องฟ้าเริ่มหม่นลง เขารับมันไว้ด้วยสายตาที่เข้าใจความหมาย... ถึงเวลาต้องตัดสินใจขั้นสุดท้าย");
    
    document.body.classList.add("higanbana-mode");
    startPetals(); 
    
    let img = document.getElementById("story-image");
    img.src = "er1.png"; 
    img.style.display = "block";
    triggerCinematic("story-image"); 
    
    let choices = document.getElementById("choices");
    choices.innerHTML = `
        <button class="btn-higanbana" onclick="endingHiganbanaTurnAway()">หันหลังเดินจากไป</button>
        <button class="btn-higanbana" onclick="endingHiganbanaGoodbye()">กล่าวคำอำลา</button>
    `;
    triggerCinematic("choices"); 
}

function endingHiganbanaTurnAway() {
    saveState();
    document.getElementById("story-title").innerText = "ความทรงจำสีจาง (ตอนจบ)";
    typeText("story-text", "คุณหันหลังกลับและก้าวเดินออกไปโดยไม่เหลียวมอง ปล่อยให้ความทรงจำถูกเก็บไว้เบื้องหลังตลอดกาล...");
    document.getElementById("choices").style.display = "none";
}

function endingHiganbanaGoodbye() {
    saveState();
    document.getElementById("story-title").innerText = "คำลาสุดท้าย (ตอนจบ)";
    typeText("story-text", "'ขอบคุณสำหรับทุกอย่าง' คุณเอ่ยคำลาก่อนจะแยกย้ายกันไปเติบโตในเส้นทางของตัวเองอย่างงดงาม...");
    document.getElementById("choices").style.display = "none";
}

function sendSecretMessage() {
    let inputField = document.getElementById("user-input");
    if(inputField.value.trim() === "") return;
    inputField.value = ""; 
    document.getElementById("status-message").innerText = "ความรู้สึกของคุณถูกส่งไปเก็บไว้ในที่ที่ปลอดภัยแล้ว...";
    setTimeout(() => { document.getElementById("status-message").innerText = ""; }, 3000);
}

// 👨‍🏫 ตอนเปิดเว็บครั้งแรก สมอง JS จะสั่งให้พิมพ์ข้อความแรกขึ้นมา
window.onload = () => {
    typeText("story-text", "คุณยืนอยู่ตรงหน้าเขา ท่ามกลางความเงียบงันที่ลอยวนอยู่ในอากาศ... คุณตัดสินใจที่จะหยิบสิ่งใดออกมาเพื่อแทนความรู้สึก?");
};