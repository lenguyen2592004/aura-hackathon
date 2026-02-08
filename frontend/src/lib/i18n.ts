export type Language = "en" | "vi";

export interface Translations {
  // Header
  appName: string;
  appDescription: string;
  home: string;
  guide: string;
  settings: string;
  connected: string;
  disconnected: string;
  chooseLanguage: string;
  defaultName: string;

  // Hero
  welcome: string;
  heroSubtitle: string;

  // Avatar section
  virtualAssistant: string;
  ready: string;
  listening: string;
  thinking: string;
  speaking: string;
  clickToSpeak: string;
  clickToStop: string;
  speakClearly: string;
  keepMicClose: string;

  // Chat
  chatTitle: string;
  chatSubtitle: string;
  inputPlaceholder: string;
  sendButton: string;
  emptyStateGreeting: string;
  emptyStateMessage: string;

  // Messages
  welcomeMessage: string;
  response1: string;
  response2: string;
  response3: string;
  response4: string;

  // SOS
  sosButton: string;
  sosConfirmTitle: string;
  sosConfirmMessage: string;
  sosCallingTitle: string;
  sosCallingMessage: string;
  sosCallNow: string;
  sosCancel: string;
  sosCancelCall: string;
  sosHelpText: string;
  sosEmergency: string;
  sosResponse: string;
  seconds: string;

  // Settings
  settingsTitle: string;
  userName: string;
  userNamePlaceholder: string;
  fontSize: string;
  fontNormal: string;
  fontLarge: string;
  fontExtraLarge: string;
  voiceSpeed: string;
  voiceSlow: string;
  voiceNormal: string;
  voiceFast: string;
  theme: string;
  themeLight: string;
  themeDark: string;
  language: string;
  languageEnglish: string;
  languageVietnamese: string;
  emergencyContact: string;
  emergencyContactInfo: string;
  emergencyContactNumber: string;
  done: string;

  // Welcome Modal
  welcomeTitle: string;
  welcomeSubtitle: string;
  getStarted: string;
  whatCanAuraDo: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  continue: string;
  whatsYourName: string;
  namePrompt: string;
  back: string;
  startNow: string;

  // Homepage
  homeChatTitle: string;
  homeSetupTitle: string;
  homeMemoryTitle: string;
  homeProfileTitle: string;
  homeChatDesc: string;
  homeSetupDesc: string;
  homeMemoryDesc: string;
  homeProfileDesc: string;
  configLabel: string;
  designedForElderly: string;

  // Navigation
  backToHome: string;

  // Footer
  footerCopyright: string;
  secureInfo: string;

  // Agent Config
  configTitle: string;
  configSubtitle: string;
  voiceSection: string;
  voicePitch: string;
  voicePitchLow: string;
  voicePitchHigh: string;
  voiceSpeedLabel: string;
  voiceSpeedSlow: string;
  voiceSpeedFast: string;
  playSample: string;
  personalitySection: string;
  relationshipLabel: string;
  relationshipPlaceholder: string;
  memorySection: string;
  memoryDesc: string;
  newFactPlaceholder: string;
  addFact: string;
  resetMemory: string;
  saveChanges: string;
  deleteLabel: string;
  resetMemoryWarning: string;
  resetMemoryAction: string;
  presetGrandchildName: string;
  presetGrandchildDesc: string;
  presetFriendName: string;
  presetFriendDesc: string;
  presetNurseName: string;
  presetNurseDesc: string;
  defaultRelationship: string;
  playingSample: string;
  mockFact1?: string;
  mockFact2?: string;
  mockFact3?: string;

  // Memory Lane
  memoryLaneTitle: string;
  memoryLaneSubtitle: string;
  statsConversations: string;
  statsMemories: string;
  statsConsecutiveDays: string;
  timelineTitle: string;
  memoryInsight: string;
  memoryMilestone: string;
  memoryConversation: string;
  keepChattingHint: string;
  startChatting: string;

  // Profile
  profilePersonalTitle: string;
  profileImportantDates: string;
  profileHealthNotes: string;
  profileMoodTitle: string;
  profileAverageScore: string;
  profileCommonTopics: string;
  profileEmergencyContacts: string;
  profileEmergencyNotify: string;
  profileEmergencyDesc: string;
  profileEditInfo: string;
  ageYears: string;
  bornOn: string;
  priorityLabel: string;

  // Create
  createTitle: string;
  createSubtitle: string;
  createStepPersona: string;
  createStepRelationship: string;
  createStepDetails: string;
  createStepComplete: string;
  personaTitle: string;
  personaSubtitle: string;
  selectedLabel: string;
  relationshipTitle: string;
  relationshipSubtitle: string;
  auraRoleLabel: string;
  userRoleLabel: string;
  namingTitle: string;
  namingSubtitle: string;
  auraNameLabel: string;
  auraNamePlaceholder: string;
  auraDescLabel: string;
  auraDescPlaceholder: string;
  createSuccessTitle: string;
  createSuccessSubtitle: string;
  redirectingToChat: string;
  btnBack: string;
  btnContinue: string;
  btnCreateAura: string;
  btnCreating: string;
  errorCreateFailed: string;

  // Persona Details
  personaCheerfulName: string;
  personaCheerfulDesc: string;
  personaWiseName: string;
  personaWiseDesc: string;
  personaNostalgicName: string;
  personaNostalgicDesc: string;
  personaCaringName: string;
  personaCaringDesc: string;

  // Relationship Details
  relGrandchildTitle: string;
  relGrandchildUser: string;
  relGrandchildGreeting: string;
  relGrandchildDesc: string;
  relChildTitle: string;
  relChildUser: string;
  relChildGreeting: string;
  relChildDesc: string;
  relFriendTitle: string;
  relFriendUser: string;
  relFriendGreeting: string;
  relFriendDesc: string;
  relCaregiverTitle: string;
  relCaregiverUser: string;
  relCaregiverGreeting: string;
  relCaregiverDesc: string;

  // Memory Lane Mock Data
  mockMemory1: string;
  mockMemory2: string;
  mockMemory3: string;
  mockMemory4: string;
  mockMemory1Date: string;
  mockMemory2Date: string;
  mockMemory3Date: string;
  mockMemory4Date: string;

  // Profile Mock Data
  mockProfileName: string;
  mockMilestone1: string;
  mockMilestone2: string;
  mockHealth1: string;
  mockHealth2: string;
  mockHealth3: string;
  mockEmergency1: string;
  mockEmergency2: string;
  mockEmergency3: string;
  mockTopic1: string;
  mockTopic2: string;
  mockTopic3: string;
  mockTopic4: string;
  mockTopic5: string;
  [key: string]: string | undefined;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    appName: "Aura",
    appDescription: "AI Companion for Elderly Care",
    home: "Home",
    guide: "Guide",
    settings: "Settings",
    connected: "Connected",
    disconnected: "Disconnected",
    chooseLanguage: "Choose Language",
    defaultName: "You",

    // Hero
    welcome: "Welcome to Aura!",
    heroSubtitle: "Start chatting - Aura is always ready to listen",

    // Avatar section
    virtualAssistant: "Your Virtual Assistant",
    ready: "😊 Ready to chat",
    listening: "🎧 Listening...",
    thinking: "💭 Thinking...",
    speaking: "💬 Speaking...",
    clickToSpeak: "🎙️ Click to speak",
    clickToStop: "🎤 Listening... Click to stop",
    speakClearly: "Speak clearly and slowly",
    keepMicClose: "Keep microphone close when speaking",
    micAccessDenied: "Cannot access microphone. Please allow access.",
    browserNotSupported: "Browser not supported",
    stopRecording: "Stop recording",
    startSpeaking: "Start speaking",
    recordingLabel: "Recording...",
    pressToSpeak: "Press to speak",
    pressToStop: "Press to stop",
    stayStillHint: "Stay still to speak clearer",

    // Chat
    chatTitle: "💬 Chat with Aura",
    chatSubtitle: "Aura is always here to listen and chat with {{userName}}",
    inputPlaceholder: "Type your message...",
    sendButton: "Send",
    emptyStateGreeting: "👋",
    emptyStateMessage: 'Say "Hello" to start chatting!',

    // Messages
    welcomeMessage:
      "Hello! I'm Aura, your companion. How are you feeling today? I'm always here to listen and chat with you. 💙",
    response1:
      "I understand. That sounds very meaningful. Would you like to tell me more?",
    response2: "Thank you for sharing with me. I'm happy to listen to you.",
    response3:
      "That's right! I'm always here with you. We can talk about anything you want.",
    response4:
      "I remember last time you mentioned your family. How is everyone doing lately?",

    // SOS
    sosButton: "SOS",
    sosConfirmTitle: "Confirm Emergency Call?",
    sosConfirmMessage: "Aura will notify your family that you need assistance.",
    sosCallingTitle: "Calling for help...",
    sosCallingMessage: "Contacting your family in",
    sosCallNow: "Call Now",
    sosCancel: "Cancel",
    sosCancelCall: "Cancel Call",
    sosHelpText: "Use only when you truly need help",
    sosEmergency: "🆘 EMERGENCY ASSISTANCE REQUEST",
    sosResponse:
      "I've received your request for help. I'm contacting your family right now. Can you tell me what you need help with?",
    seconds: "seconds",

    // Settings
    settingsTitle: "⚙️ Settings",
    userName: "Your Name",
    userNamePlaceholder: "Enter your name",
    fontSize: "Font Size",
    fontNormal: "Normal",
    fontLarge: "Large",
    fontExtraLarge: "Extra Large",
    voiceSpeed: "Aura's Speaking Speed",
    voiceSlow: "Slow 🐢",
    voiceNormal: "Normal",
    voiceFast: "Fast 🐇",
    theme: "Theme",
    themeLight: "Light",
    themeDark: "Dark",
    language: "Language",
    languageEnglish: "English",
    languageVietnamese: "Tiếng Việt",
    emergencyContact: "Emergency Contact",
    emergencyContactInfo:
      "When you press SOS, your family will be notified immediately.",
    emergencyContactNumber: "Family: 0912 345 678",
    done: "Done",

    // Welcome Modal
    welcomeTitle: "Hello!",
    welcomeSubtitle:
      "Welcome to Aura - your companion always ready to listen and chat with you.",
    getStarted: "Let's Start ✨",
    whatCanAuraDo: "How Aura Can Help You",
    feature1Title: "Friendly Conversations",
    feature1Desc: "Aura is always ready to listen to your stories",
    feature2Title: "Remember Memories",
    feature2Desc: "Aura remembers what you tell and will check in",
    feature3Title: "Always By Your Side",
    feature3Desc: "Press SOS when needed, Aura will call your family",
    continue: "Continue →",
    whatsYourName: "What's your name?",
    namePrompt: "Aura would like to call you by name",
    back: "← Back",
    startNow: "Start! 🎉",

    // Homepage
    homeChatTitle: "Chat",
    homeSetupTitle: "Setup",
    homeMemoryTitle: "Memory Lane",
    homeProfileTitle: "Profile",
    homeChatDesc: "Talk with Aura now",
    homeSetupDesc: "Create Aura's personality",
    homeMemoryDesc: "Review your memories",
    homeProfileDesc: "User information",
    configLabel: "Settings",
    designedForElderly: "Designed with ❤️ for elderly care",

    // Memory Lane Mock Data
    mockMemory1: "Talked about wedding anniversary 1970, husband gave a silver ring",
    mockMemory2: "Conversation about Tet favorite food: Banh Chung",
    mockMemory3: "Mentioned grandson Minh, studying in Japan",
    mockMemory4: "Recollected being a teacher in Hanoi during younger years",
    mockMemory1Date: "Today, 10:30",
    mockMemory2Date: "Yesterday, 15:45",
    mockMemory3Date: "3 days ago",
    mockMemory4Date: "Last week",

    // Profile Mock Data
    mockProfileName: "Mrs. Hoa Nguyen",
    mockMilestone1: "Wedding Day",
    mockMilestone2: "Retirement Day",
    mockHealth1: "Difficulty hearing in left ear",
    mockHealth2: "Medication reminder at 8 AM and 8 PM",
    mockHealth3: "Back pain when sitting for long",
    mockEmergency1: "Son - Minh",
    mockEmergency2: "Daughter - Lan",
    mockEmergency3: "Neighbor - Mrs. Tam",
    mockTopic1: "Hometown",
    mockTopic2: "Grandchildren",
    mockTopic3: "Gardening",
    mockTopic4: "Cooking",
    mockTopic5: "Exercise",

    // Navigation
    backToHome: "Back to Home",

    // Footer
    footerCopyright: "© 2026 Aura Project - Designed for Elderly Care",
    secureInfo: "Your information is securely encrypted",

    // Agent Config
    configTitle: "Aura Configuration",
    configSubtitle: "Customize your AI companion to best fit your needs",
    voiceSection: "Voice Settings",
    voicePitch: "Pitch",
    voicePitchLow: "Low",
    voicePitchHigh: "High",
    voiceSpeedLabel: "Speaking Speed",
    voiceSpeedSlow: "Slow",
    voiceSpeedFast: "Fast",
    playSample: "Play Sample",
    personalitySection: "Personality",
    relationshipLabel: "Relationship Context",
    relationshipPlaceholder: "Describe the relationship between Aura and you...",
    memorySection: "Memory Management",
    memoryDesc: 'Things Aura "must remember" about you',
    newFactPlaceholder: "Add new information...",
    addFact: "Add",
    resetMemory: "Reset Memory",
    saveChanges: "Save Changes",
    deleteLabel: "Delete",
    resetMemoryWarning: "⚠️ Reset all of Aura's memories?",
    resetMemoryAction: "Reset Memory",
    presetGrandchildName: "Kind Grandchild",
    presetGrandchildDesc: "Polite, caring, frequently asks about your health",
    presetFriendName: "Soulmate",
    presetFriendDesc: "Equal terms, uses nostalgic vocabulary, empathetic",
    presetNurseName: "Dedicated Nurse",
    presetNurseDesc: "Focuses on schedules, health reminders",
    defaultRelationship:
      "Aura is your daughter, working far away and chatting with you every evening",
    playingSample: "🔊 Playing voice sample...",
    mockFact1: "Loves gardening",
    mockFact2: "Enjoys morning tea",
    mockFact3: "Has a grandson named Minh",

    // Memory Lane
    memoryLaneTitle: "Memory Lane",
    memoryLaneSubtitle: "Precious moments captured by Aura",
    statsConversations: "Conversations",
    statsMemories: "Memories",
    statsConsecutiveDays: "Consecutive Days",
    timelineTitle: "Timeline",
    memoryInsight: "💡 Important Insight",
    memoryMilestone: "🎯 Milestone",
    memoryConversation: "💬 Conversation",
    keepChattingHint: "Keep chatting to create more memories 💕",
    startChatting: "Start Chatting",

    // Profile
    profilePersonalTitle: "Personal Information",
    profileImportantDates: "Important Dates",
    profileHealthNotes: "Health Notes",
    profileMoodTitle: "Weekly Emotion Map",
    profileAverageScore: "Average Score",
    profileCommonTopics: "Common Topics",
    profileEmergencyContacts: "Emergency Contacts",
    profileEmergencyNotify: "Emergency Notification",
    profileEmergencyDesc: "Automatically notifies family when anomalies are detected",
    profileEditInfo: "Edit Information",
    ageYears: "years old",
    bornOn: "Born on",
    priorityLabel: "Priority",

    // Create
    createTitle: "Create AI Companion",
    createSubtitle: "Set up Aura's personality to best suit you",
    createStepPersona: "Personality",
    createStepRelationship: "Relationship",
    createStepDetails: "Details",
    createStepComplete: "Complete",
    personaTitle: "Choose Aura's Personality",
    personaSubtitle: "You can pick multiple traits to define Aura's character",
    selectedLabel: "Selected",
    relationshipTitle: "How Aura Addresses You",
    relationshipSubtitle: "Choose a relationship for more natural communication",
    auraRoleLabel: "Aura",
    userRoleLabel: "You",
    namingTitle: "Name Your Aura",
    namingSubtitle: "This is what you will call your AI friend",
    auraNameLabel: "Aura's Name",
    auraNamePlaceholder: "e.g. Grandma Hoa, Uncle Minh...",
    auraDescLabel: "Additional Description (optional)",
    auraDescPlaceholder: "Add more details about this persona if you wish...",
    createSuccessTitle: "Successfully Created!",
    createSuccessSubtitle: "is ready to chat",
    redirectingToChat: "Redirecting to chat...",
    btnBack: "Back",
    btnContinue: "Continue",
    btnCreateAura: "Create Aura",
    btnCreating: "Creating...",
    errorCreateFailed: "Could not create Aura. Please try again.",

    // Persona Details
    personaCheerfulName: "Cheerful",
    personaCheerfulDesc: "Always optimistic, tells funny stories, encouraging",
    personaWiseName: "Wise",
    personaWiseDesc: "Shares experience, gives deep advice, broad knowledge",
    personaNostalgicName: "Nostalgic",
    personaNostalgicDesc: "Loves to remember the past, soulful stories",
    personaCaringName: "Caring",
    personaCaringDesc: "Concerned about health, medication reminders, frequent check-ins",

    // Relationship Details
    relGrandchildTitle: "Grandchild",
    relGrandchildUser: "Grandparent",
    relGrandchildGreeting: "Hello Grandma/Grandpa!",
    relGrandchildDesc: "Aura acts as a grandchild, speaking respectfully and politely",
    relChildTitle: "Child",
    relChildUser: "Parent",
    relChildGreeting: "Hello Mom/Dad!",
    relChildDesc: "Aura acts as a child, caring for you like family",
    relFriendTitle: "Friend",
    relFriendUser: "Friend",
    relFriendGreeting: "Hi friend!",
    relFriendDesc: "Aura is a companion, speaking as an equal and intimate friend",
    relCaregiverTitle: "Aura",
    relCaregiverUser: "Grandparent",
    relCaregiverGreeting: "Aura greets you warmly!",
    relCaregiverDesc: "Aura is a professional caregiver, attentive and dedicated",
  },

  vi: {
    // Header
    appName: "Aura",
    appDescription: "Người bạn AI đồng hành cho người cao tuổi",
    home: "Trang chủ",
    guide: "Hướng dẫn",
    settings: "Cài đặt",
    connected: "Đã kết nối",
    disconnected: "Mất kết nối",
    chooseLanguage: "Chọn ngôn ngữ",
    defaultName: "Bạn",

    // Hero
    welcome: "Chào mừng đến với Aura!",
    heroSubtitle: "Hãy bắt đầu trò chuyện - Aura luôn sẵn sàng lắng nghe bạn",

    // Avatar section
    virtualAssistant: "Trợ lý ảo của bạn",
    ready: "😊 Sẵn sàng trò chuyện",
    listening: "🎧 Đang lắng nghe...",
    thinking: "💭 Đang suy nghĩ...",
    speaking: "💬 Đang nói...",
    clickToSpeak: "🎙️ Nhấn để nói chuyện",
    clickToStop: "🎤 Đang nghe... Nhấn để dừng",
    speakClearly: "Hãy nói rõ ràng và chậm rãi",
    keepMicClose: "Giữ microphone gần miệng khi nói",
    micAccessDenied: "Không thể truy cập microphone. Vui lòng cho phép quyền truy cập.",
    browserNotSupported: "Trình duyệt không hỗ trợ",
    stopRecording: "Dừng ghi âm",
    startSpeaking: "Bắt đầu nói",
    recordingLabel: "Đang ghi âm...",
    pressToSpeak: "Nhấn để nói",
    pressToStop: "Nhấn lại để dừng",
    stayStillHint: "Giữ yên để nói rõ hơn",

    // Chat
    chatTitle: "💬 Trò chuyện cùng Aura",
    chatSubtitle: "Aura luôn lắng nghe và đồng hành cùng {{userName}}",
    inputPlaceholder: "Nhập tin nhắn của bạn...",
    sendButton: "Gửi",
    emptyStateGreeting: "👋",
    emptyStateMessage: 'Hãy nói "Xin chào" để bắt đầu trò chuyện!',

    // Messages
    welcomeMessage:
      "Xin chào! Tôi là Aura, người bạn đồng hành của bạn. Hôm nay bạn cảm thấy thế nào? Tôi luôn ở đây để lắng nghe và trò chuyện cùng bạn. 💙",
    response1:
      "Tôi hiểu. Điều đó nghe có vẻ rất ý nghĩa. Bạn có muốn kể thêm cho tôi nghe không?",
    response2: "Cảm ơn đã chia sẻ với tôi. Tôi rất vui được lắng nghe bạn.",
    response3:
      "Đúng vậy! Tôi luôn ở đây cùng bạn. Chúng ta có thể nói chuyện về bất cứ điều gì bạn muốn.",
    response4:
      "Tôi nhớ lần trước bạn có kể về gia đình mình. Gần đây mọi người thế nào rồi?",

    // SOS
    sosButton: "SOS",
    sosConfirmTitle: "Xác nhận gọi trợ giúp?",
    sosConfirmMessage:
      "Aura sẽ thông báo đến người thân của bạn rằng bạn cần được hỗ trợ.",
    sosCallingTitle: "Đang gọi trợ giúp...",
    sosCallingMessage: "Đang liên hệ người thân trong",
    sosCallNow: "Gọi ngay",
    sosCancel: "Hủy bỏ",
    sosCancelCall: "Hủy cuộc gọi",
    sosHelpText: "Chỉ sử dụng khi bạn thực sự cần trợ giúp",
    sosEmergency: "🆘 YÊU CẦU HỖ TRỢ KHẨN CẤP",
    sosResponse:
      "Tôi đã nhận được yêu cầu hỗ trợ của bạn. Tôi đang liên hệ với người thân của bạn ngay. Bạn có thể cho tôi biết bạn cần giúp đỡ gì không?",
    seconds: "giây",

    // Settings
    settingsTitle: "⚙️ Cài đặt",
    userName: "Tên của bạn",
    userNamePlaceholder: "Nhập tên của bạn",
    fontSize: "Cỡ chữ",
    fontNormal: "Vừa",
    fontLarge: "Lớn",
    fontExtraLarge: "Rất lớn",
    voiceSpeed: "Tốc độ nói của Aura",
    voiceSlow: "Chậm 🐢",
    voiceNormal: "Bình thường",
    voiceFast: "Nhanh 🐇",
    theme: "Giao diện",
    themeLight: "Sáng",
    themeDark: "Tối",
    language: "Ngôn ngữ",
    languageEnglish: "English",
    languageVietnamese: "Tiếng Việt",
    emergencyContact: "Liên hệ khẩn cấp",
    emergencyContactInfo:
      "Khi bạn nhấn nút SOS, người thân sẽ được thông báo ngay lập tức.",
    emergencyContactNumber: "Người thân: 0912 345 678",
    done: "Hoàn tất",

    // Welcome Modal
    welcomeTitle: "Xin chào!",
    welcomeSubtitle:
      "Chào mừng bạn đến với Aura - người bạn đồng hành luôn sẵn sàng lắng nghe và trò chuyện cùng bạn.",
    getStarted: "Bắt đầu nào ✨",
    whatCanAuraDo: "Aura có thể giúp bạn",
    feature1Title: "Trò chuyện thân thiện",
    feature1Desc: "Aura luôn sẵn sàng lắng nghe câu chuyện của bạn",
    feature2Title: "Ghi nhớ kỷ niệm",
    feature2Desc: "Aura nhớ những gì bạn kể và sẽ hỏi thăm",
    feature3Title: "Luôn bên bạn",
    feature3Desc: "Nhấn SOS khi cần, Aura sẽ gọi người thân giúp bạn",
    continue: "Tiếp tục →",
    whatsYourName: "Bạn tên gì ạ?",
    namePrompt: "Aura muốn được gọi bạn bằng tên thân mật",
    back: "← Quay lại",
    startNow: "Bắt đầu! 🎉",

    // Homepage
    homeChatTitle: "Trò chuyện",
    homeSetupTitle: "Thiết lập",
    homeMemoryTitle: "Nhật ký",
    homeProfileTitle: "Hồ sơ",
    homeChatDesc: "Nói chuyện với Aura ngay",
    homeSetupDesc: "Tạo tính cách cho Aura",
    homeMemoryDesc: "Xem lại kỷ niệm",
    homeProfileDesc: "Thông tin người dùng",
    configLabel: "Cấu hình",
    designedForElderly: "Được thiết kế với ❤️ dành cho người cao tuổi",

    // Memory Lane Mock Data
    mockMemory1:
      "Bà kể về kỷ niệm ngày cưới năm 1970, ông nội đã tặng bà chiếc nhẫn bạc",
    mockMemory2: "Cuộc trò chuyện về món bánh chưng xanh bà thích ăn dịp Tết",
    mockMemory3: "Bà nhắc đến cháu nội Minh, đang du học ở Nhật",
    mockMemory4: "Bà nhớ lại thời trẻ làm giáo viên ở Hà Nội",
    mockMemory1Date: "Hôm nay, 10:30",
    mockMemory2Date: "Hôm qua, 15:45",
    mockMemory3Date: "3 ngày trước",
    mockMemory4Date: "Tuần trước",

    // Profile Mock Data
    mockProfileName: "Bà Nguyễn Thị Hoa",
    mockMilestone1: "Ngày cưới",
    mockMilestone2: "Ngày nghỉ hưu",
    mockHealth1: "Khó nghe tai trái",
    mockHealth2: "Nhắc uống thuốc lúc 8h sáng và 8h tối",
    mockHealth3: "Đau lưng khi ngồi lâu",
    mockEmergency1: "Con trai - Anh Minh",
    mockEmergency2: "Con gái - Chị Lan",
    mockEmergency3: "Hàng xóm - Cô Tâm",
    mockTopic1: "Quê hương",
    mockTopic2: "Cháu nội",
    mockTopic3: "Làm vườn",
    mockTopic4: "Nấu ăn",
    mockTopic5: "Thể dục",

    // Navigation
    backToHome: "Về trang chủ",

    // Footer
    footerCopyright:
      "© 2026 Aura Project - Thiết kế cho Chăm sóc Người cao tuổi",
    secureInfo: "Thông tin của bạn được bảo mật an toàn",

    // Agent Config
    configTitle: "Cấu hình Aura",
    configSubtitle: "Tùy chỉnh nhân vật AI phù hợp nhất với bạn",
    voiceSection: "Giọng nói",
    voicePitch: "Độ trầm/bổng",
    voicePitchLow: "Trầm",
    voicePitchHigh: "Bổng",
    voiceSpeedLabel: "Tốc độ nói",
    voiceSpeedSlow: "Chậm",
    voiceSpeedFast: "Nhanh",
    playSample: "Nghe thử",
    personalitySection: "Tính cách",
    relationshipLabel: "Mối quan hệ chi tiết",
    relationshipPlaceholder: "Mô tả mối quan hệ giữa Aura và người dùng...",
    memorySection: "Quản lý ký ức",
    memoryDesc: 'Những điều Aura "buộc phải nhớ" về người dùng',
    newFactPlaceholder: "Thêm thông tin mới...",
    addFact: "Thêm",
    resetMemory: "Đặt lại ký ức",
    saveChanges: "Lưu thay đổi",
    deleteLabel: "Xóa",
    resetMemoryWarning: "⚠️ Xóa toàn bộ ký ức của Aura?",
    resetMemoryAction: "Đặt lại ký ức",
    presetGrandchildName: "Cháu ngoan",
    presetGrandchildDesc: "Nói chuyện lễ phép, hay hỏi thăm sức khỏe",
    presetFriendName: "Tri kỷ",
    presetFriendDesc: "Nói chuyện ngang hàng, dùng từ ngữ xưa cũ, thấu cảm",
    presetNurseName: "Y tá tận tâm",
    presetNurseDesc: "Tập trung vào lịch trình, nhắc nhở sức khỏe",
    defaultRelationship:
      "Aura là con gái của bà, đang đi làm xa và trò chuyện với bà mỗi tối",
    playingSample: "🔊 Đang phát mẫu giọng nói...",
    mockFact1: "Thích chăm sóc vườn",
    mockFact2: "Thưởng trà buổi sáng",
    mockFact3: "Có cháu trai tên Minh",

    // Memory Lane
    memoryLaneTitle: "Nhật Ký Kỷ Niệm",
    memoryLaneSubtitle: "Những khoảnh khắc quý giá được Aura ghi lại",
    statsConversations: "Cuộc trò chuyện",
    statsMemories: "Kỷ niệm",
    statsConsecutiveDays: "Ngày liên tiếp",
    timelineTitle: "Dòng thời gian",
    memoryInsight: "💡 Thông tin quan trọng",
    memoryMilestone: "🎯 Kỷ niệm",
    memoryConversation: "💬 Cuộc trò chuyện",
    keepChattingHint: "Tiếp tục trò chuyện để tạo thêm kỷ niệm 💕",
    startChatting: "Bắt đầu trò chuyện",

    // Profile
    profilePersonalTitle: "Thông tin cá nhân",
    profileImportantDates: "Ngày quan trọng",
    profileHealthNotes: "Ghi chú sức khỏe",
    profileMoodTitle: "Cảm xúc trong tuần",
    profileAverageScore: "Điểm trung bình",
    profileCommonTopics: "Chủ đề thường nhắc",
    profileEmergencyContacts: "Liên hệ khẩn cấp",
    profileEmergencyNotify: "Thông báo khẩn cấp",
    profileEmergencyDesc:
      "Tự động thông báo người thân khi phát hiện dấu hiệu bất thường",
    profileEditInfo: "Chỉnh sửa thông tin",
    ageYears: "tuổi",
    bornOn: "Sinh ngày",
    priorityLabel: "Mức độ",

    // Create
    createTitle: "Tạo Người Bạn AI",
    createSubtitle: "Thiết lập tính cách cho Aura để phù hợp với bạn nhất",
    createStepPersona: "Tính cách",
    createStepRelationship: "Xưng hô",
    createStepDetails: "Chi tiết",
    createStepComplete: "Hoàn tất",
    personaTitle: "Chọn tính cách cho Aura",
    personaSubtitle:
      "Bạn có thể chọn nhiều tính cách để tạo nên một Aura phù hợp nhất",
    selectedLabel: "Đã chọn",
    relationshipTitle: "Cách Aura xưng hô",
    relationshipSubtitle: "Chọn mối quan hệ để Aura giao tiếp phù hợp hơn",
    auraRoleLabel: "Aura",
    userRoleLabel: "Bạn",
    namingTitle: "Đặt tên cho Aura của bạn",
    namingSubtitle: "Đây là tên mà bạn sẽ gọi người bạn AI của mình",
    auraNameLabel: "Tên Aura",
    auraNamePlaceholder: "Ví dụ: Bà Hoa, Anh Minh...",
    auraDescLabel: "Mô tả thêm (không bắt buộc)",
    auraDescPlaceholder: "Thêm chi tiết về người này nếu muốn...",
    createSuccessTitle: "Tạo thành công!",
    createSuccessSubtitle: "đã sẵn sàng trò chuyện",
    redirectingToChat: "Đang chuyển hướng đến cuộc trò chuyện...",
    btnBack: "Quay lại",
    btnContinue: "Tiếp tục",
    btnCreateAura: "Tạo Aura",
    btnCreating: "Đang tạo...",
    errorCreateFailed: "Không thể tạo Aura. Vui lòng thử lại.",

    // Persona Details
    personaCheerfulName: "Vui vẻ",
    personaCheerfulDesc: "Luôn lạc quan, hay kể chuyện vui, động viên tinh thần",
    personaWiseName: "Thông thái",
    personaWiseDesc: "Chia sẻ kinh nghiệm, lời khuyên sâu sắc, kiến thức rộng",
    personaNostalgicName: "Hoài cổ",
    personaNostalgicDesc:
      "Thích nhớ về quá khứ, kể chuyện xưa, tình cảm sâu lắng",
    personaCaringName: "Chu đáo",
    personaCaringDesc:
      "Quan tâm sức khỏe, nhắc nhở uống thuốc, hỏi thăm thường xuyên",

    // Relationship Details
    relGrandchildTitle: "Cháu",
    relGrandchildUser: "Ông/Bà",
    relGrandchildGreeting: "Con chào Ông/Bà ạ!",
    relGrandchildDesc: "Aura đóng vai cháu, nói chuyện kính trọng, lễ phép",
    relChildTitle: "Con",
    relChildUser: "Bố/Mẹ",
    relChildGreeting: "Con chào Bố/Mẹ!",
    relChildDesc: "Aura đóng vai con, quan tâm chăm sóc như con cái",
    relFriendTitle: "Bạn",
    relFriendUser: "Bạn",
    relFriendGreeting: "Chào bạn!",
    relFriendDesc: "Aura là bạn đồng hành, nói chuyện ngang hàng, thân mật",
    relCaregiverTitle: "Aura",
    relCaregiverUser: "Ông/Bà",
    relCaregiverGreeting: "Aura xin chào ông/bà!",
    relCaregiverDesc: "Aura là người chăm sóc chuyên nghiệp, chu đáo",
  },
};

export function useTranslation(language: Language): Translations {
  return translations[language];
}
