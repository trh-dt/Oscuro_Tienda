import asyncio
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.types import WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton, ReplyKeyboardMarkup, KeyboardButton
from aiogram.filters import Command
from dotenv import load_dotenv
import os

# Загружаем переменные окружения
load_dotenv()
TOKEN = os.getenv("BOT_TOKEN")  # Теперь токен берётся из .env файла

# Создаём бота
bot = Bot(token=TOKEN)
dp = Dispatcher()

# Главное меню (Reply-клавиатура)
menu_keyboard = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="🛍 Открыть магазин", web_app=WebAppInfo(url="https://trh-dt.github.io/Oscuro_Tienda/index.html"))],
        [KeyboardButton(text="ℹ️ Помощь"), KeyboardButton(text="📞 Контакты")]
    ],
    resize_keyboard=True
)

# Inline-кнопки (например, в ответ на команду)
shop_inline_keyboard = InlineKeyboardMarkup(
    inline_keyboard=[
        [InlineKeyboardButton(text="🛍 Перейти в магазин", web_app=WebAppInfo(url="https://trh-dt.github.io/Oscuro_Tienda/index.html"))],
        [InlineKeyboardButton(text="📦 Каталог", callback_data="catalog"), InlineKeyboardButton(text="📞 Контакты", callback_data="contacts")]
    ]
)

# Команда /start
@dp.message(Command("start"))
async def start(message: types.Message):
    await message.answer("Привет! Добро пожаловать в Oscuro Tienda!", reply_markup=menu_keyboard)

# Команда /shop (Inline-кнопка)
@dp.message(Command("shop"))
async def shop(message: types.Message):
    await message.answer("Добро пожаловать в Oscuro Tienda!", reply_markup=shop_inline_keyboard)

# Команда /help
@dp.message(Command("help"))
async def help_cmd(message: types.Message):
    await message.answer("📌 Доступные команды:\n/start - Главное меню\n/shop - Открыть магазин\n/help - Помощь\n/contacts - Контакты")

# Команда /contacts
@dp.message(Command("contacts"))
async def contacts(message: types.Message):
    await message.answer("📞 Контакты:\nTelegram: @support\nInstagram: @oscurotienda")

# Обработчик callback-кнопок
@dp.callback_query()
async def handle_callback(callback: types.CallbackQuery):
    if callback.data == "catalog":
        await callback.message.answer("📦 Каталог: https://t.me/your_bot?start=shop")
    elif callback.data == "contacts":
        await callback.message.answer("📞 Контакты:\nTelegram: @support\nInstagram: @oscurotienda")

async def main():
    logging.basicConfig(level=logging.INFO)
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())