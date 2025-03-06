import asyncio
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.types import WebAppInfo

TOKEN = "7913005358:AAG-SomQHx37Z4xBFVy5KyufSskFhYA2Y9w"

bot = Bot(token=TOKEN)
dp = Dispatcher()

# Команда /start
@dp.message(commands=['start'])
async def start(message: types.Message):
    keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True)
    button = types.KeyboardButton(
        text="🛍 Открыть магазин",
        web_app=WebAppInfo(url="https://ТВОЙ_GITHUB_НИК.github.io/oscuro-tienda/")
    )
    keyboard.add(button)
    await message.answer("Привет! Добро пожаловать в Oscuro Tienda!", reply_markup=keyboard)

# Inline-кнопка (если нужна встроенная)
@dp.message(commands=['shop'])
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
    dp.include_router(dp)
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
    
    
    #https://trh-dt.github.io/Oscuro_Tienda/index.html
    #7913005358:AAG-SomQHx37Z4xBFVy5KyufSskFhYA2Y9w