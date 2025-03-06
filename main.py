import asyncio
import logging
from aiogram import Bot, Dispatcher, types, F
from aiogram.types import WebAppInfo
from aiogram.filters import Command  # Новый импорт

TOKEN = "7913005358:AAG-SomQHx37Z4xBFVy5KyufSskFhYA2Y9w"

bot = Bot(token=TOKEN)
dp = Dispatcher()

# Команда /start
@dp.message(Command("start"))  # <-- Исправленный фильтр
async def start(message: types.Message):
    keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True)
    button = types.KeyboardButton(
        text="🛍 Открыть магазин",
        web_app=WebAppInfo(url="https://trh-dt.github.io/Oscuro_Tienda/index.html")
    )
    keyboard.add(button)
    await message.answer("Привет! Добро пожаловать в Oscuro Tienda!", reply_markup=keyboard)

# Inline-кнопка (если нужна встроенная)
@dp.message(Command("shop"))  # <-- Исправленный фильтр
async def shop(message: types.Message):
    keyboard = types.InlineKeyboardMarkup()
    button = types.InlineKeyboardButton(
        text="🛍 Перейти в магазин",
        web_app=WebAppInfo(url="https://trh-dt.github.io/Oscuro_Tienda/index.html")
    )
    keyboard.add(button)
    await message.answer("Добро пожаловать в Oscuro Tienda!", reply_markup=keyboard)

async def main():
    logging.basicConfig(level=logging.INFO)
    await bot.delete_webhook(drop_pending_updates=True)
    dp.include_router(dp)  # <-- Убедись, что этот вызов добавляет роутеры
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
    
    
    #https://trh-dt.github.io/Oscuro_Tienda/index.html
    #7913005358:AAG-SomQHx37Z4xBFVy5KyufSskFhYA2Y9w