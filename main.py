import asyncio
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.types import WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton, ReplyKeyboardMarkup, KeyboardButton
from aiogram.filters import Command
from dotenv import load_dotenv
import os

# Загружаем переменные окружения
load_dotenv()
TOKEN = os.getenv("BOT_TOKEN")  

# Создаём бота
bot = Bot(token=TOKEN)
dp = Dispatcher()

# Главное меню (Reply-клавиатура)
menu_keyboard = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="✅ Открыть магазин", web_app=WebAppInfo(url="https://trh-dt.github.io/Oscuro_Tienda/index.html"))],
        [KeyboardButton(text="📦 Каталог"), KeyboardButton(text="ℹ️ Помощь")],
        [KeyboardButton(text="📞 Контакты")]
    ],
    resize_keyboard=True
)

# Inline-кнопки (для быстрого доступа)
shop_inline_keyboard = InlineKeyboardMarkup(
    inline_keyboard=[
        [InlineKeyboardButton(text="✅ Перейти в магазин", web_app=WebAppInfo(url="https://trh-dt.github.io/Oscuro_Tienda/index.html"))],
        [InlineKeyboardButton(text="📦 Каталог", callback_data="catalog"), InlineKeyboardButton(text="📞 Контакты", callback_data="contacts")]
    ]
)

# Команда /start
@dp.message(Command("start"))
async def start(message: types.Message):
    await message.answer("Привет! Добро пожаловать в HTR Shop! Выберите действие:", reply_markup=menu_keyboard)

# Обработка кнопки "Каталог"
@dp.message(lambda message: message.text == "📦 Каталог")
async def catalog(message: types.Message):
    await message.answer("🗃️ Каталог товаров:\n♻️ Чехлы\n♻️ Аксессуары\n♻️ Футболки с принтами\n♻️Худи с принтами\nСкоро добавим больше товаров!", reply_markup=shop_inline_keyboard)

# Обработка кнопки "Контакты"
@dp.message(lambda message: message.text == "📞 Контакты")
async def contacts(message: types.Message):
    await message.answer("📞 Контакты:\nТелеграм: @estilo_01")

# Обработка кнопки "Помощь"
@dp.message(lambda message: message.text == "ℹ️ Помощь")
async def help_cmd(message: types.Message):
    await message.answer("ℹ️ Как пользоваться ботом?\n\n1️⃣ Нажмите \"✅ Открыть магазин\" – чтобы перейти в веб-приложение.\n2️⃣ Нажмите \"📦 Каталог\" – чтобы посмотреть список товаров.\n3️⃣ Нажмите \"📞 Контакты\" – для связи с поддержкой.\n\nПриятных покупок!")

# Обработчик callback-кнопок
@dp.callback_query()
async def handle_callback(callback: types.CallbackQuery):
    if callback.data == "catalog":
        await callback.message.answer("📦 Каталог: https://t.me/oscuro_tienda_bot")
    elif callback.data == "contacts":
        await callback.message.answer("📞 Контакты:\nТелеграм: @estilo_01")

async def main():
    logging.basicConfig(level=logging.INFO)
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
    
    
    