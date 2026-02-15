import random

VOICE_MAPPING = {
    "zephyr": "Zephyr",
    "bright_puck": "Puck",
    "lively_charon": "Charon",
    "information_source": "Kore",
    "korea": "Kore",
    "firm_fenrir": "Fenrir",
    "leda": "Kore",
    "orus": "Puck",
    "aoede": "Aoede",
    "callirrhoe": "Kore",
    "autonoe": "Aoede",
    "enceladus": "Charon",
    "iapetus": "Puck",
    "umbriel": "Fenrir",
    "algieba": "Aoede",
    "despina": "Kore",
    "erinome": "Kore",
    "algenib": "Charon",
    "rasalgethi": "Puck",
    "laomedeia": "Aoede",
    "achernar": "Fenrir",
    "alnilam": "Puck",
    "geographic": "Kore",
    "gacrux": "Charon",
    "pulcherrima": "Aoede",
    "achird": "Fenrir",
    "zubenelgenubi": "Puck",
    "vindemiatrix": "Kore",
    "sadachbia": "Aoede",
    "sadaltager": "Charon",
    "sulafat": "Kore"
}

AVAILABLE_GEMINI_VOICES = ["Puck", "Charon", "Kore", "Fenrir", "Aoede"]

VOICE_LIST = [
    {"id": "zephyr", "display_name": "Zephyr", "gender": "male", "attribute": "Breezy"},
    {"id": "bright_puck", "display_name": "BrightPuck", "gender": "male", "attribute": "Bright"},
    {"id": "lively_charon", "display_name": "LivelyCharon", "gender": "male", "attribute": "Lively"},
    {"id": "information_source", "display_name": "Information Source", "gender": "female", "attribute": "Provides a wealth of information"},
    {"id": "korea", "display_name": "Korea", "gender": "female", "attribute": "Firm"},
    {"id": "firm_fenrir", "display_name": "FirmFenrir", "gender": "male", "attribute": "Easily agitated"},
    {"id": "leda", "display_name": "Leda", "gender": "female", "attribute": "Youthful"},
    {"id": "orus", "display_name": "Orus", "gender": "male", "attribute": "Firm"},
    {"id": "aoede", "display_name": "Aoede", "gender": "female", "attribute": "Breezy"},
    {"id": "callirrhoe", "display_name": "Callirrhoe", "gender": "female", "attribute": "Comfortable"},
    {"id": "autonoe", "display_name": "Autonoe", "gender": "female", "attribute": "Bright"},
    {"id": "enceladus", "display_name": "Enceladus", "gender": "male", "attribute": "Breathy"},
    {"id": "iapetus", "display_name": "Iapetus", "gender": "male", "attribute": "Clearly"},
    {"id": "umbriel", "display_name": "Umbriel", "gender": "male", "attribute": "Easygoing"},
    {"id": "algieba", "display_name": "Algieba", "gender": "female", "attribute": "Smoothing"},
    {"id": "despina", "display_name": "Despina", "gender": "female", "attribute": "Smooth"},
    {"id": "erinome", "display_name": "Erinome", "gender": "female", "attribute": "Clear"},
    {"id": "algenib", "display_name": "Algenib", "gender": "male", "attribute": "Gravelly"},
    {"id": "rasalgethi", "display_name": "Rasalgethi", "gender": "male", "attribute": "Provides a wealth of information"},
    {"id": "laomedeia", "display_name": "Laomedeia", "gender": "female", "attribute": "Lively"},
    {"id": "achernar", "display_name": "Achernar", "gender": "male", "attribute": "Soft"},
    {"id": "alnilam", "display_name": "Alnilam", "gender": "male", "attribute": "Firm"},
    {"id": "geographic", "display_name": "Geographic", "gender": "female", "attribute": "Outside"},
    {"id": "gacrux", "display_name": "Gacrux", "gender": "male", "attribute": "Adult"},
    {"id": "pulcherrima", "display_name": "Pulcherrima", "gender": "female", "attribute": "Transition"},
    {"id": "achird", "display_name": "Achird", "gender": "male", "attribute": "Friendly"},
    {"id": "zubenelgenubi", "display_name": "Zubenelgenubi", "gender": "male", "attribute": "Common"},
    {"id": "vindemiatrix", "display_name": "Vindemiatrix", "gender": "female", "attribute": "Gentle"},
    {"id": "sadachbia", "display_name": "Sadachbia", "gender": "female", "attribute": "Lively"},
    {"id": "sadaltager", "display_name": "Sadaltager", "gender": "male", "attribute": "Understanding"},
    {"id": "sulafat", "display_name": "Sulafat", "gender": "female", "attribute": "Kettle"}
]

MALE_VOICES = [v["id"] for v in VOICE_LIST if v["gender"] == "male"]
FEMALE_VOICES = [v["id"] for v in VOICE_LIST if v["gender"] == "female"]

def get_gemini_voice(voice_id: str, default: str = "Kore") -> str:
    if not voice_id:
        return default
    return VOICE_MAPPING.get(voice_id.lower(), default)

def get_random_voice_by_gender(gender: str) -> str:
    if gender == "male":
        return random.choice(MALE_VOICES)
    elif gender == "female":
        return random.choice(FEMALE_VOICES)
    else:
        return random.choice(MALE_VOICES + FEMALE_VOICES)
