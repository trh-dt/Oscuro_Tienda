from aiogram import Bot, Dispatcher, types
from aiogram.types import WebAppInfo
from aiogram.utils import executor

TOKEN = "7913005358:AAG-SomQHx37Z4xBFVy5KyufSskFhYA2Y9w"

bot = Bot(token=TOKEN)
dp = Dispatcher(bot)

@dp.message_handler(commands=['start'])
async def start(message: types.Message):
    keyboard = types.ReplyKeyboardMarkup(resize_keyboard=True)
    button = types.KeyboardButton(text="🛍 Открыть магазин", web_app=WebAppInfo(url="https://oscurotienda.com"))
    keyboard.add(button)
    await message.answer("Привет! Добро пожаловать в Oscuro Tienda", reply_markup=keyboard)

if __name__ == "__main__":
    from aiogram import executor
    executor.start_polling(dp)