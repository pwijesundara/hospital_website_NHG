// Bilingual copy for the Book Appointment form.
// `lang` is "en" | "si"; components read strings from translations[lang].
// Form field *values* (gender codes, prefLang names, time slots) never change —
// only the displayed labels do, via the *Display maps below.

export const genderOptionDisplay = {
  en: { "": "Select gender alignment", male: "Male", female: "Female", other: "Other / Omit verification parameter" },
  si: { "": "තෝරන්න", male: "පුරුෂ", female: "ස්ත්‍රී", other: "වෙනත්" },
  ta: { "": "தேர்ந்தெடுக்கவும்", male: "ஆண்", female: "பெண்", other: "மற்றவை" },
};

export const prefLangDisplay = {
  en: { English: "English", Sinhala: "Sinhala", Tamil: "Tamil" },
  si: { English: "ඉංග්‍රීසි", Sinhala: "සිංහල", Tamil: "දෙමළ" },
  ta: { English: "ஆங்கிலம்", Sinhala: "சிங்களம்", Tamil: "தமிழ்" },
};

export const translations = {
  en: {
    toggleLabel: "Language",

    intro: {
      eyebrow: "National Tertiary Teaching Complex",
      title: "Outpatient & Specialist Scheduling Engine",
      desc: "Populate target metrics to access professional medical streams. Registry operators process transactions systematically against real-time queue caps within one business window.",
      triagePre: "Critical Triage Gate: If facing localized chest discomfort, acute respiratory restrictions, or profound trauma paths, do NOT log electronic queue files. Divert immediately to the Trauma Unit complex floor or initiate ",
      triageStrong: "1990 Emergency response lines",
      triagePost: ".",
    },

    personal: {
      title: "1. Personal Demographic Records",
      loading: "Loading patient details...",
      firstName: "First name",
      lastName: "Last name",
      dob: "Date of birth",
      gender: "Gender identity",
      nic: "National ID (NIC) / Passport Reference",
      nicHint: "Used to extract existing electronic history files smoothly from centralized clinical logs.",
      phone: "Primary Contact Mobile Stream",
      phoneHint: "Critical token gate. Session tracking tokens route here.",
      email: "Electronic Mail (Email)",
      emailHint: "Optional. Alternative diagnostic summary dispatch routing endpoint.",
      address: "Residential Boundary Address",
      addressHint: "District bounds classification matches core scheduling zones.",
    },

    type: {
      title: "2. Allocation Target Matrix",
      loading: "Loading clinic sessions...",
      empty: "No clinic sessions available.",
      error: "Failed to load clinic sessions.",
      unknownClinic: "Unknown clinic",
      noDate: "No date",
      noLocation: "No location",
      capacity: "Capacity",
      at: "at",
    },

    schedule: {
      title: "4. Time-Space Parameters",
      date: "Target Calendar Date",
      dateHint: "Standard clinics operate Monday through Saturday.",
      time: "Preferred Queue Block Slot",
      timePlaceholder: "Select target session time",
      hrs: "hrs",
      lang: "Primary Consultation Dialect",
    },

    medical: {
      title: "5. Contextual Medical Indicators",
      reason: "Reason for Session Allocation",
      reasonHint: "Provide short outline of symptoms or specific referral indications clearly.",
      reasonPlaceholder:
        "Describe presentation logs (e.g. Chronic joint stiffness noticed during morning cycles, localized swelling over left knee base)...",
    },

    submit: {
      consent:
        "I confirm the appointment details are accurate and consent to hospital staff using these details to process this appointment request.",
      secureNote: "End-to-End Secure Health Records Transaction Architecture",
      button: "Transmit Session Request",
      buttonLoading: "Transmitting...",
    },

    helpdesk: {
      question: "Experiencing parameter mapping friction?",
      sub: "Connect with local administrative line operators directly. Multi-lingual operations enabled.",
      ext: "091 222 2261 - Desk Ext. 1",
    },

    success: {
      badge: "Request Logged Successfully",
      title: "Confirmation Awaiting Review",
      descPre: "Your parameters match standard submission paths. A secure validation SMS dispatch is scheduled for ",
      descPost: " following administrative desk lookups.",
      refLabel: "Registry Tracking reference",
      streamLabel: "Target Stream",
      windowLabel: "Assigned Windows",
      deskLine: "Central Verification Line Desk: 091 222 2261",
      reset: "Allocate New Session Record",
    },
  },

  si: {
    toggleLabel: "භාෂාව",

    intro: {
      eyebrow: "ජාතික උපදේශන රෝහල් සංකීර්ණය",
      title: "බාහිර රෝගී හා විශේෂඥ වේලාවන් වෙන්කරවා ගැනීම",
      desc: "අවශ්‍ය තොරතුරු පුරවා වෛද්‍ය සේවාවන් වෙත පිවිසෙන්න. ලියාපදිංචි කිරීමේ නිලධාරීන් ඔබගේ ඉල්ලීම එක් වැඩ දිනක් තුළ පිළිවෙළින් සකසනු ඇත.",
      triagePre:
        "හදිසි අවස්ථා අනතුරු ඇඟවීම: පපුවේ වේදනාව, හුස්ම ගැනීමේ අපහසුතා හෝ බරපතළ තුවාල ඇත්නම් මාර්ගගත වේලාවක් වෙන්කරවා නොගන්න. වහාම හදිසි ප්‍රතිකාර ඒකකයට යන්න හෝ ",
      triageStrong: "1990 හදිසි ඇම්බියුලන්ස් සේවයට",
      triagePost: " කතා කරන්න.",
    },

    personal: {
      title: "1. පුද්ගලික තොරතුරු වාර්තා",
      loading: "රෝගී තොරතුරු පූරණය වෙමින්...",
      firstName: "මුල් නම",
      lastName: "වාසගම",
      dob: "උපන් දිනය",
      gender: "ස්ත්‍රී / පුරුෂ භාවය",
      nic: "ජාතික හැඳුනුම්පත (NIC) / විදේශ ගමන් බලපත්‍රය",
      nicHint: "ඔබගේ පැරණි වෛද්‍ය වාර්තා ක්ෂණිකව ලබා ගැනීම සඳහා භාවිතා වේ.",
      phone: "දුරකථන අංකය",
      phoneHint: "වැදගත්: තහවුරු කිරීමේ හා වේලාව පිළිබඳ කෙටි පණිවිඩ මෙම අංකයට එවනු ලැබේ.",
      email: "විද්‍යුත් තැපෑල (Email)",
      emailHint: "අත්‍යවශ්‍ය නොවේ. වෛද්‍ය වාර්තා සාරාංශ එවීම සඳහා විකල්ප ලිපිනයකි.",
      address: "පදිංචි ලිපිනය",
      addressHint: "දිස්ත්‍රික්කය අනුව සායන කලාප වෙන් කිරීමට භාවිතා වේ.",
    },

    type: {
      title: "2. සායනය හා වේලාව තෝරන්න",
      loading: "සායන වේලාවන් පූරණය වෙමින්...",
      empty: "දැනට සායන වේලාවන් නොමැත.",
      error: "සායන වේලාවන් පූරණය කිරීමට නොහැකි විය.",
      unknownClinic: "නොදන්නා සායනය",
      noDate: "දිනයක් නැත",
      noLocation: "ස්ථානයක් නැත",
      capacity: "ඉඩකඩ",
      at: "-",
    },

    schedule: {
      title: "4. දිනය හා වේලාව",
      date: "දිනය",
      dateHint: "සාමාන්‍ය සායන සඳුදා සිට සෙනසුරාදා දක්වා පවත්වයි.",
      time: "කැමති වේලාව",
      timePlaceholder: "වේලාවක් තෝරන්න",
      hrs: "පැය",
      lang: "උපදේශන භාෂාව",
    },

    medical: {
      title: "5. වෛද්‍ය තොරතුරු",
      reason: "පැමිණීමට හේතුව",
      reasonHint: "ඔබගේ රෝග ලක්ෂණ හෝ යොමු කිරීමේ හේතුව කෙටියෙන් පැහැදිලිව සඳහන් කරන්න.",
      reasonPlaceholder:
        "රෝග ලක්ෂණ විස්තර කරන්න (උදා: උදෑසන පැය කිහිපයේ සන්ධි තද ගතිය, වම් දණහිස ආසන්නයේ ඉදිමීම)...",
    },

    submit: {
      consent:
        "මෙම වේලාව වෙන්කරවා ගැනීමේ තොරතුරු නිවැරදි බව සහ එය සැකසීම සඳහා රෝහල් කාර්ය මණ්ඩලය මෙම තොරතුරු භාවිත කිරීමට මම එකඟ වෙමි.",
      secureNote: "ආරක්ෂිත සෞඛ්‍ය තොරතුරු හුවමාරු පද්ධතිය",
      button: "ඉල්ලීම යොමු කරන්න",
      buttonLoading: "යොමු කරමින්...",
    },

    helpdesk: {
      question: "පෝරමය පිරවීමේදී ගැටලුවක් තිබේද?",
      sub: "අපගේ කාර්යාල දුරකථන අංකයට කෙලින්ම කතා කරන්න. බහුභාෂා සේවා ඇත.",
      ext: "091 222 2261 - දිගුව 1",
    },

    success: {
      badge: "ඉල්ලීම සාර්ථකව ලැබිණි",
      title: "තහවුරු කිරීම සමාලෝචනය වෙමින්",
      descPre: "ඔබගේ ඉල්ලීම ලැබී ඇත. කාර්යාල පරීක්ෂාවෙන් පසු ",
      descPost: " අංකයට තහවුරු කිරීමේ කෙටි පණිවිඩයක් එවනු ලැබේ.",
      refLabel: "ලුහුබැඳීමේ අංකය",
      streamLabel: "අදාළ අංශය",
      windowLabel: "වෙන් කළ වේලාව",
      deskLine: "මධ්‍යම තහවුරු කිරීමේ දුරකථනය: 091 222 2261",
      reset: "නව ඉල්ලීමක් යොමු කරන්න",
    },
  },

  ta: {
    toggleLabel: "மொழி",

    intro: {
      eyebrow: "தேசிய மேல்நிலை போதனா வளாகம்",
      title: "வெளிநோயாளர் மற்றும் நிபுணர் நேரம் பதிவு செய்தல்",
      desc: "தேவையான தகவல்களை பூர்த்தி செய்து மருத்துவ சேவைகளை பெறுங்கள். பதிவு அலுவலர்கள் உங்கள் கோரிக்கையை ஒரு வேலை நாளுக்குள் முறையாக செயல்படுத்துவார்கள்.",
      triagePre:
        "அவசர எச்சரிக்கை: மார்பு வலி, சுவாசிப்பதில் சிரமம் அல்லது கடுமையான காயம் ஏற்பட்டால் இணையவழி நேரம் பதிவு செய்ய வேண்டாம். உடனடியாக அவசர சிகிச்சை பிரிவுக்குச் செல்லவும் அல்லது ",
      triageStrong: "1990 அவசர ஆம்புலன்ஸ் சேவையை",
      triagePost: " தொடர்பு கொள்ளவும்.",
    },

    personal: {
      title: "1. தனிப்பட்ட விவரங்கள்",
      loading: "நோயாளர் விவரங்கள் ஏற்றப்படுகிறது...",
      firstName: "முதல் பெயர்",
      lastName: "கடைசி பெயர்",
      dob: "பிறந்த தேதி",
      gender: "பாலினம்",
      nic: "தேசிய அடையாள அட்டை (NIC) / கடவுச்சீட்டு",
      nicHint: "உங்கள் முந்தைய மருத்துவ பதிவுகளை விரைவாக பெற இது பயன்படுத்தப்படுகிறது.",
      phone: "தொலைபேசி எண்",
      phoneHint: "முக்கியம்: உறுதிப்படுத்தல் மற்றும் நேரம் தொடர்பான குறுஞ்செய்திகள் இந்த எண்ணுக்கு அனுப்பப்படும்.",
      email: "மின்னஞ்சல் (Email)",
      emailHint: "விருப்பத்திற்குரியது. மருத்துவ சுருக்க அறிக்கைகளை அனுப்ப மாற்று முகவரி.",
      address: "வதிவிட முகவரி",
      addressHint: "மாவட்டத்திற்கு ஏற்ப சிகிச்சை பிரிவுகள் பிரிக்கப்படுகின்றன.",
    },

    type: {
      title: "2. சிகிச்சைப் பிரிவு மற்றும் நேரம் தேர்வு",
      loading: "சிகிச்சை நேரங்கள் ஏற்றப்படுகிறது...",
      empty: "தற்போது சிகிச்சை நேரங்கள் இல்லை.",
      error: "சிகிச்சை நேரங்களை ஏற்ற முடியவில்லை.",
      unknownClinic: "தெரியாத சிகிச்சைப் பிரிவு",
      noDate: "தேதி இல்லை",
      noLocation: "இடம் இல்லை",
      capacity: "இடவசதி",
      at: "-",
    },

    schedule: {
      title: "4. தேதி மற்றும் நேரம்",
      date: "தேதி",
      dateHint: "வழக்கமான சிகிச்சைகள் திங்கள் முதல் சனிக்கிழமை வரை நடைபெறும்.",
      time: "விருப்பமான நேரம்",
      timePlaceholder: "நேரத்தைத் தேர்ந்தெடுக்கவும்",
      hrs: "மணி",
      lang: "ஆலோசனை மொழி",
    },

    medical: {
      title: "5. மருத்துவ தகவல்கள்",
      reason: "வருகைக்கான காரணம்",
      reasonHint: "உங்கள் அறிகுறிகள் அல்லது பரிந்துரைக்கான காரணத்தை சுருக்கமாகக் குறிப்பிடவும்.",
      reasonPlaceholder:
        "அறிகுறிகளை விவரிக்கவும் (எ.கா. காலையில் சில மணி நேரம் மூட்டு விறைப்பு, இடது முழங்காலில் வீக்கம்)...",
    },

    submit: {
      consent:
        "இந்த நேரப் பதிவு விவரங்கள் சரியானவை என்பதையும், இதைச் செயல்படுத்த மருத்துவமனை ஊழியர்கள் இந்த தகவல்களைப் பயன்படுத்த சம்மதிக்கிறேன் என்பதையும் உறுதிப்படுத்துகிறேன்.",
      secureNote: "பாதுகாப்பான சுகாதார தகவல் பரிமாற்ற முறைமை",
      button: "கோரிக்கையை அனுப்பவும்",
      buttonLoading: "அனுப்பப்படுகிறது...",
    },

    helpdesk: {
      question: "படிவத்தை பூர்த்தி செய்வதில் சிரமமா?",
      sub: "எங்கள் அலுவலக தொலைபேசி எண்ணை நேரடியாக அழைக்கவும். பல மொழி சேவைகள் உள்ளன.",
      ext: "091 222 2261 - நீட்டிப்பு 1",
    },

    success: {
      badge: "கோரிக்கை வெற்றிகரமாகப் பெறப்பட்டது",
      title: "உறுதிப்படுத்தல் மதிப்பாய்வில் உள்ளது",
      descPre: "உங்கள் கோரிக்கை பெறப்பட்டுள்ளது. அலுவலக சரிபார்ப்புக்குப் பின் ",
      descPost: " என்ற எண்ணுக்கு உறுதிப்படுத்தல் குறுஞ்செய்தி அனுப்பப்படும்.",
      refLabel: "கண்காணிப்பு எண்",
      streamLabel: "தொடர்புடைய பிரிவு",
      windowLabel: "ஒதுக்கப்பட்ட நேரம்",
      deskLine: "மத்திய உறுதிப்படுத்தல் தொலைபேசி: 091 222 2261",
      reset: "புதிய கோரிக்கையை அனுப்பவும்",
    },
  },
};
