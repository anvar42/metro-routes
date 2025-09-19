export const chilonzorStations = [
  { name_uz: "Buyuk Ipak yo'li", name_ru: "Буюк Ипак йули", isTransfer: false },
  { name_uz: "Pushkin", name_ru: "Пушкинская", isTransfer: false },
  { name_uz: "Hamid Olimjon", name_ru: "Хамид Олимджан", isTransfer: false },
  { name_uz: "Amir Temur xiyoboni", name_ru: "Амир Темур хиёбони", isTransfer: true },
  { name_uz: "Paxtakor", name_ru: "Пахтакор", isTransfer: true },
  { name_uz: "Xalqlar do'stligi", name_ru: "Халклар дустлиги", isTransfer: false },
  { name_uz: "Milliy bog'", name_ru: "Миллий бог", isTransfer: false },
  { name_uz: "Novza", name_ru: "Новза", isTransfer: false },
  { name_uz: "Mirzo Ulug'bek", name_ru: "Мирзо Улугбек", isTransfer: false },
  { name_uz: "Chilonzor", name_ru: "Чиланзар", isTransfer: false },
  { name_uz: "Olmazor", name_ru: "Олмазор", isTransfer: false },
  { name_uz: "Choshxona", name_ru: "Чоштепа", isTransfer: false },
  { name_uz: "O'zgarish", name_ru: "Узгариш", isTransfer: false },
  { name_uz: "Sergeli", name_ru: "Сергели", isTransfer: false },
  { name_uz: "Yangi hayot", name_ru: "Янги хаёт", isTransfer: false },
  { name_uz: "Chinor", name_ru: "Чинор", isTransfer: false },
];

export const uzbekistanStations = [
  { name_uz: "Beruniy", name_ru: "Беруни", isTransfer: false },
  { name_uz: "Tinchlik", name_ru: "Тинчлик", isTransfer: false },
  { name_uz: "Chorsu", name_ru: "Чорсу", isTransfer: false },
  { name_uz: "G'afur G'ulom", name_ru: "Гафур Гулям", isTransfer: false },
  { name_uz: "Alisher Navoiy", name_ru: "Алишер Навои", isTransfer: true },
  { name_uz: "Paxtakor", name_ru: "Пахтакор", isTransfer: true },
  { name_uz: "Kosmonavtlar", name_ru: "Космонавтлар", isTransfer: false },
  { name_uz: "Oybek", name_ru: "Ойбек", isTransfer: true },
  { name_uz: "Toshkent", name_ru: "Ташкент", isTransfer: false },
  { name_uz: "Mashinasozlar", name_ru: "Машинасозлар", isTransfer: false },
  { name_uz: "Do'stlik", name_ru: "Дустлик", isTransfer: true },
];

export const yunusobodStations = [
  { name_uz: "Turkiston", name_ru: "Туркистон", isTransfer: false },
  { name_uz: "Yunusobod", name_ru: "Юнусабад", isTransfer: false },
  { name_uz: "Shahriston", name_ru: "Шахристан", isTransfer: false },
  { name_uz: "Bodomzor", name_ru: "Бодомзор", isTransfer: false },
  { name_uz: "Minor", name_ru: "Минор", isTransfer: false },
  { name_uz: "Abdulla Qodiriy", name_ru: "Абдулла Кодири", isTransfer: false },
  { name_uz: "Yunus Rajabiy", name_ru: "Юнус Раджаби", isTransfer: true },
  { name_uz: "Ming O'rik", name_ru: "Минг Урик", isTransfer: true },
];

export const dostlik2Stations = [
  { name_uz: "Do'stlik", name_ru: "Дустлик", isTransfer: true },
  { name_uz: "Texnopark", name_ru: "Технопарк", isTransfer: false },
  { name_uz: "Yashnobod", name_ru: "Яшнобод", isTransfer: false },
  { name_uz: "Tuzel", name_ru: "Тузель", isTransfer: false },
  { name_uz: "Olmos", name_ru: "Олмос", isTransfer: false },
  { name_uz: "Rohat", name_ru: "Рохат", isTransfer: false },
  { name_uz: "Yangiobod", name_ru: "Янгиобод", isTransfer: false },
];

export const halqaStations = [
  { name_uz: "Qipchoq", name_ru: "Кипчак", isTransfer: false },
  { name_uz: "Turon", name_ru: "Турон", isTransfer: false },
  { name_uz: "Quruvchilar", name_ru: "Курувчилар", isTransfer: false },
  { name_uz: "Xonobod", name_ru: "Хонобод", isTransfer: false },
  { name_uz: "Tolar", name_ru: "Толар", isTransfer: false },
  { name_uz: "Qiyot", name_ru: "Киёт", isTransfer: false },
  { name_uz: "Matonat", name_ru: "Матонат", isTransfer: false },
  { name_uz: "Qo'yliq", name_ru: "Куйлик", isTransfer: false },
];

export const allRoutesData = [
  { name_uz: "Chilonzor yo'li", name_ru: "Чиланзарская линия", stations: chilonzorStations },
  { name_uz: "O'zbekiston yo'li", name_ru: "Узбекистанская линия", stations: uzbekistanStations },
  { name_uz: "Yunusobod yo'li", name_ru: "Юнусабадская линия", stations: yunusobodStations },
  { name_uz: "Do'stlik 2-yo'nalishi", name_ru: "Линия Дустлик-2", stations: dostlik2Stations },
  { name_uz: "Halqa yo'li", name_ru: "Кольцевая линия", stations: halqaStations },
];

export const allTransfersData = [
  { from_uz: "Paxtakor", to_uz: "Alisher Navoiy" },
  { from_uz: "Amir Temur xiyoboni", to_uz: "Yunus Rajabiy" },
  { from_uz: "Oybek", to_uz: "Ming O'rik" },
  { from_uz: "Do'stlik", to_uz: "Do'stlik" },
];
