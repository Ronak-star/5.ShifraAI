/*(function () {


    // userData

    const script = document.currentScript;

    const userId = script?.dataset?.userId

    const theme = "dark"

    let assistantConfig = null


    // load CSS

    const link = document.createElement("link")

    link.rel = "stylesheet"

    link.href = "http://localhost:5173/assistant.css"

    document.head.appendChild(link)


    // Create PopUp

    const popup = document.createElement("div")

    popup.className = `shifra-popup theme-${theme}`

    popup.innerHTML = `
    <div class="shifra-overlay"></div>

    <div class="shifra-content">

       <div class="shifra-top">
            <div class="shifra-orb-wrap">

                <div class="shifra-orb-glow"></div>

                <div class="shifra-orb"></div>

            </div>

            <h2 class="shifra-title">
                Hello! I'm Shifra AI
            </h2>

            <p class="shifra-sub">
                Your smart voice assistant.
                <br />
                Ask anything about your website.
            </p>


            <div class="shifra-status">
                Tap button to Speak
            </div>

            <div class="shifra-wave">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <!-- User Text -->
            <div class="shifra-user-text">
            </div>

            <!-- AI Text -->
            <div class="shifra-ai-text">
            </div>
  
        </div>


        <div class="shifra-bottom">
            
            <button class="shifra-mic">

               <img 
               src="http://localhost:5173/mic.svg"
               alt="mic"
               class="shifra-mic-icon"/>
            </button>
        </div>
    </div>
    
    `;

    document.body.appendChild(popup);

    // floating Button

    const button = document.createElement("button")

    button.className = `shifra-btn theme-${theme}`

    button.innerHTML = `
    <img 
    src="http://localhost:5173/logo.png"
    alt="logo"
    />`;
    document.body.appendChild(button)




    // toggle popup

    let open = false

    button.onclick = () => {
        open = !open;
        popup.style.display = open ? "flex" : "none";
    }


    // load Assistant

    const loadAssistant = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/assistant/config/${userId}`)

            const data = await res.json()

            if (data) {
                assistantConfig = data.user
                applyConfig()
            }

        } catch (error) {
            console.log(
                "Assistant Load Error:",
                error
            );
        }
    }


    const applyConfig = () => {
        if (!assistantConfig) return;

        popup.className = `shifra-popup theme-${assistantConfig.theme}`

        button.className = `shifra-btn theme-${assistantConfig.theme}`

        const title = popup.querySelector(".shifra-title")

        title.innerHTML = `Hello! I'm ${assistantConfig.assistantName}`;

        const subTitle = popup.querySelector(".shifra-sub")
        subTitle.innerHTML = `
    Welcome to
    ${assistantConfig.businessName}.
    <br />
    Ask anything about your website.
  `;


    }

    loadAssistant()


    // Element


    const status =
        popup.querySelector(
            ".shifra-status"
        );

    const wave =
        popup.querySelector(
            ".shifra-wave"
        );

    const userText =
        popup.querySelector(
            ".shifra-user-text"
        );

    const aiText =
        popup.querySelector(
            ".shifra-ai-text"
        );

    const mic =
        popup.querySelector(
            ".shifra-mic"
        );



    // text-speech

    const speak = (text) => {
        window.speechSynthesis.cancel();

        // Show AI response
        aiText.innerText =
            text;

        status.innerText =
            "AI Speaking...";

        const speech = new SpeechSynthesisUtterance(text)

        speech.lang =
            "hi-IN";

        speech.rate = 1;

        speech.pitch = 1;

        speech.volume = 1;

        // Voice end
        speech.onend = () => {

            status.innerText =
                "Tap button to Speak";

            wave.style.opacity =
                "0";
        };

        // Start speaking
        window.speechSynthesis.speak(
            speech
        );
    }


    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition


    if(SpeechRecognition){

        const recognition = new SpeechRecognition();

        recognition.lang =
      "en-US";

    recognition.continuous =
      false;

    recognition.interimResults =
      false;


      mic.onclick=()=>{
        wave.style.opacity =
        "1";

      status.innerText =
        "Listening...";

      userText.innerText =
        "";

      aiText.innerText =
        "";

      recognition.start();
      }


      recognition.onresult = (e)=>{
        const text = e.results[0][0].transcript

        userText.innerText = "You: " + text;

        recognition.stop();


        setTimeout( async () => {
            try {
                status.innerText = "Thinking...";
                

                const res = await fetch("http://localhost:8000/api/assistant/ask" , {
                    method:"POST",
                    headers:{
                        "Content-Type":
                      "application/json",
                    } ,
                    body:JSON.stringify({
                        message:text,
                        userId
                    })
                })

                const data = await res.json()
                console.log(data)

                if(data.success){

                    if(data.action === "navigate"){
                        speak(data.response)

                        setTimeout(()=>{
                            window.location.href = data.path

                        },1500)

                    }else{
                        speak(data.aiResponse)
                    }

                }else{
                    speak("Response Error please Check your plan")

                }



            } catch (error) {
                console.log(error)
                speak("AI Server Error")
                
            }
        },600)
      };

      recognition.onerror = ()=>{
        status.innerText =
          "Tap button to Speak";

        wave.style.opacity =
          "0";
      }


    }
    else{
        status.innerText =
      "Speech Recognition not supported";
    }


})();

*/




























/*

(function () {

    const script = document.currentScript;
    const userId = script?.dataset?.userId;

    const theme = "dark";
    let assistantConfig = null;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "http://localhost:5173/assistant.css";
    document.head.appendChild(link);

    const popup = document.createElement("div");
    popup.className = `shifra-popup theme-${theme}`;
    popup.innerHTML = `
    <div class="shifra-overlay"></div>

    <div class="shifra-content">

       <div class="shifra-top">

            <div class="shifra-orb-wrap">
                <div class="shifra-orb-glow"></div>
                <div class="shifra-orb"></div>
            </div>

            <h2 class="shifra-title">
                Hello! I'm Shifra AI
            </h2>

            <p class="shifra-sub">
                Your smart voice assistant.
                <br />
                Ask anything about your website.
            </p>

            <div class="shifra-status">
                Tap button to Speak
            </div>

            <div class="shifra-wave">
                <span></span><span></span><span></span>
                <span></span><span></span><span></span>
            </div>

            <div class="shifra-user-text"></div>
            <div class="shifra-ai-text"></div>

        </div>

        <div class="shifra-bottom">
            <button class="shifra-mic">
               <img src="http://localhost:5173/mic.svg" class="shifra-mic-icon"/>
            </button>
        </div>

    </div>
    `;

    document.body.appendChild(popup);

    const button = document.createElement("button");
    button.className = `shifra-btn theme-${theme}`;
    button.innerHTML = `<img src="http://localhost:5173/logo.png" />`;
    document.body.appendChild(button);

    let open = false;

    button.onclick = () => {
        open = !open;
        popup.style.display = open ? "flex" : "none";
    };

    const loadAssistant = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/assistant/config/${userId}`);
            const data = await res.json();

            if (data?.user) {
                assistantConfig = data.user;
                applyConfig();
            }

        } catch (error) {
            console.log("Assistant Load Error:", error);
        }
    };

    const applyConfig = () => {
        if (!assistantConfig) return;

        popup.className = `shifra-popup theme-${assistantConfig.theme}`;
        button.className = `shifra-btn theme-${assistantConfig.theme}`;

        const title = popup.querySelector(".shifra-title");
        title.innerHTML = `Hello! I'm ${assistantConfig.assistantName}`;

        const subTitle = popup.querySelector(".shifra-sub");
        subTitle.innerHTML = `
            Welcome to
            ${assistantConfig.businessName}.
            <br />
            Ask anything about your website.
        `;
    };

    loadAssistant();

    const status = popup.querySelector(".shifra-status");
    const wave = popup.querySelector(".shifra-wave");
    const userText = popup.querySelector(".shifra-user-text");
    const aiText = popup.querySelector(".shifra-ai-text");
    const mic = popup.querySelector(".shifra-mic");

    const speak = (text) => {

        window.speechSynthesis.cancel();

        aiText.innerText = text;
        status.innerText = "AI Speaking...";

        const speech = new SpeechSynthesisUtterance(text);

        // 🔥 FIX 1: voice crash fix (remove forced hi-IN)
        speech.lang = "en-US";

        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;

        speech.onend = () => {
            status.innerText = "Tap button to Speak";
            wave.style.opacity = "0";
        };

        speech.onerror = () => {
            status.innerText = "Speech Error";
            wave.style.opacity = "0";
        };

        window.speechSynthesis.speak(speech);
    };

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;

        let listening = false;

        mic.onclick = () => {

            if (listening) return;

            listening = true;

            window.speechSynthesis.cancel(); // 🔥 FIX 2

            wave.style.opacity = "1";
            status.innerText = "Listening...";
            userText.innerText = "";
            aiText.innerText = "";

            recognition.start();
        };

        recognition.onresult = (e) => {

            const text = e.results[0][0].transcript;

            userText.innerText = "You: " + text;

            recognition.stop();
            listening = false;

            setTimeout(async () => {
                try {

                    status.innerText = "Thinking...";

                    const res = await fetch(
                        "http://localhost:8000/api/assistant/ask",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                message: text,
                                userId,
                            }),
                        }
                    );

                    const data = await res.json();

                    console.log(data);

                    if (data.success) {

                        if (data.action === "navigate") {

                            // 🔥 FIX 3: wrong field fix
                            speak(data.aiResponse || data.response);

                            setTimeout(() => {
                                window.location.href = data.path;
                            }, 1500);

                        } else {
                            speak(data.aiResponse);
                        }

                    } else {
                        speak("Response Error please Check your plan");
                    }

                } catch (error) {
                    console.log(error);
                    speak("AI Server Error");
                }
            }, 600);
        };

        recognition.onerror = () => {
            status.innerText = "Tap button to Speak";
            wave.style.opacity = "0";
            listening = false;
        };

    } else {
        status.innerText = "Speech Recognition not supported";
    }

})();

*/

















(function () {

    const script = document.currentScript;
    const userId = script?.dataset?.userId;

    const theme = "dark";
    let assistantConfig = null;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://5-shifra-ai-55fv.vercel.app//assistant.css";
    document.head.appendChild(link);

    const popup = document.createElement("div");
    popup.className = `shifra-popup theme-${theme}`;
    popup.innerHTML = `
    <div class="shifra-overlay"></div>

    <div class="shifra-content">

       <div class="shifra-top">

            <div class="shifra-orb-wrap">
                <div class="shifra-orb-glow"></div>
                <div class="shifra-orb"></div>
            </div>

            <h2 class="shifra-title">
                Hello! I'm Shifra AI
            </h2>

            <p class="shifra-sub">
                Your smart voice assistant.
                <br />
                Ask anything about your website.
            </p>

            <div class="shifra-status">
                Tap button to Speak
            </div>

            <div class="shifra-wave">
                <span></span><span></span><span></span>
                <span></span><span></span><span></span>
            </div>

            <div class="shifra-user-text"></div>
            <div class="shifra-ai-text"></div>

        </div>

        <div class="shifra-bottom">
            <button class="shifra-mic">
               <img src="https://5-shifra-ai-55fv.vercel.app/mic.svg" class="shifra-mic-icon"/>
            </button>
        </div>

    </div>
    `;

    document.body.appendChild(popup);

    const button = document.createElement("button");
    button.className = `shifra-btn theme-${theme}`;
    button.innerHTML = `<img src="https://5-shifra-ai-55fv.vercel.app/logo.png" />`;
    document.body.appendChild(button);

    let open = false;

    button.onclick = () => {
        open = !open;
        popup.style.display = open ? "flex" : "none";
    };

    const loadAssistant = async () => {
        try {
            const res = await fetch(`https://5-shifra-ai.vercel.app/api/assistant/config/${userId}`);
            const data = await res.json();

            if (data?.user) {
                assistantConfig = data.user;
                applyConfig();
            }

        } catch (error) {
            console.log("Assistant Load Error:", error);
        }
    };

    const applyConfig = () => {
        if (!assistantConfig) return;

        popup.className = `shifra-popup theme-${assistantConfig.theme}`;
        button.className = `shifra-btn theme-${assistantConfig.theme}`;

        const title = popup.querySelector(".shifra-title");
        title.innerHTML = `Hello! I'm ${assistantConfig.assistantName}`;

        const subTitle = popup.querySelector(".shifra-sub");
        subTitle.innerHTML = `
            Welcome to
            ${assistantConfig.businessName}.
            <br />
            Ask anything about your website.
        `;
    };

    loadAssistant();

    const status = popup.querySelector(".shifra-status");
    const wave = popup.querySelector(".shifra-wave");
    const userText = popup.querySelector(".shifra-user-text");
    const aiText = popup.querySelector(".shifra-ai-text");
    const mic = popup.querySelector(".shifra-mic");

    const speak = (text) => {

        window.speechSynthesis.cancel();

        aiText.innerText = text;
        status.innerText = "AI Speaking...";

        const speech = new SpeechSynthesisUtterance(text);

        speech.lang = "en-US";
        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;

        speech.onend = () => {
            status.innerText = "Tap button to Speak";
            wave.style.opacity = "0";
        };

        speech.onerror = () => {
            status.innerText = "Speech Error";
            wave.style.opacity = "0";
        };

        window.speechSynthesis.speak(speech);
    };

    // 🔥 FIX: Fallback navigation detector
    // Agar backend "action: navigate" nahi bhejta, to AI response ke text se
    // detect karo ki user ne homepage/back/page X par jaane ko kaha hai.
    const detectNavigation = (userMessage, aiResponse) => {
        const msg = (userMessage || "").toLowerCase();
        const ai = (aiResponse || "").toLowerCase();

        // Homepage detection
        const homeKeywords = [
            "home page", "homepage", "back to home", "go home",
            "switch back to home", "return to the homepage",
            "returning to the homepage", "going back to home"
        ];

        const isHomeIntent =
            homeKeywords.some(k => msg.includes(k)) ||
            homeKeywords.some(k => ai.includes(k));

        if (isHomeIntent) {
            return "/";
        }

        // Page number detection e.g. "page 3", "go to page 2"
        const pageMatch =
            msg.match(/page\s*(\d+)/i) || ai.match(/page\s*(\d+)/i);

        if (pageMatch) {
            const pageNum = pageMatch[1];
            // Adjust this pattern to match your site's routing structure
            return `/page-${pageNum}`;
        }

        return null;
    };

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";
        recognition.continuous = false;
        recognition.interimResults = false;

        let listening = false;

        mic.onclick = () => {

            if (listening) return;

            listening = true;

            window.speechSynthesis.cancel();

            wave.style.opacity = "1";
            status.innerText = "Listening...";
            userText.innerText = "";
            aiText.innerText = "";

            recognition.start();
        };

        recognition.onresult = (e) => {

            const text = e.results[0][0].transcript;

            userText.innerText = "You: " + text;

            recognition.stop();
            listening = false;

            // 🔥 FIX: reduced delay 600ms -> 100ms for faster response
            setTimeout(async () => {
                try {

                    status.innerText = "Thinking...";


                    const res = await fetch(
                        "https://5-shifra-ai.vercel.app/api/assistant/ask",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                message: text,
                                userId,
                            }),
                        }
                    );

                    const data = await res.json();

                    console.log(data);

                    if (data.success) {

                        const responseText = data.aiResponse || data.response;

                        if (data.action === "navigate" && data.path) {

                            // Backend explicitly told us where to go
                            speak(responseText);

                            // 🔥 FIX: reduced 1500ms -> 800ms
                            setTimeout(() => {
                                window.location.href = data.path;
                            }, 800);

                        } else {

                            // 🔥 Fallback: detect navigation intent ourselves
                            const fallbackPath = detectNavigation(text, responseText);

                            speak(responseText);

                            if (fallbackPath) {
                                setTimeout(() => {
                                    window.location.href = fallbackPath;
                                }, 800);
                            }
                        }

                    } else {
                        speak("Response Error please Check your plan");
                    }

                } catch (error) {
                    console.log(error);
                    speak("AI Server Error");
                }
            }, 600);
        };

        recognition.onerror = () => {
            status.innerText = "Tap button to Speak";
            wave.style.opacity = "0";
            listening = false;
        };

    } else {
        status.innerText = "Speech Recognition not supported";
    }

})();

















