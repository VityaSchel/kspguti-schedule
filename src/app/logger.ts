import TelegramBot from 'node-telegram-bot-api'

const token = process.env.PARSING_FAILURE_NOTIFICATIONS_TELEGRAM_BOTAPI_TOKEN
const ownerID = process.env.PARSING_FAILURE_NOTIFICATIONS_TELEGRAM_CHAT_ID

let bot: TelegramBot
if (!token || !ownerID) {
  console.warn('Telegram Token is not specified. This means you won\'t get any notifications about parsing failures.')
} else {
  bot = new TelegramBot(token, { polling: false })
}

export async function reportParserError(...text: string[]) {
  if (!token || !ownerID) return

  await bot.sendMessage(ownerID, text.join(' '))
}