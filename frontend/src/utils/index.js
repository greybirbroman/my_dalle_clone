import FileSaver from 'file-saver';
import { surpriseMePrompts } from '../constants';


export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length); // Получим случайный индекс от 0-49

  const randomPrompt = surpriseMePrompts[randomIndex]; // Сгенерируем случайную фразу

  if (randomPrompt === prompt) return getRandomPrompt(prompt); // Используем рекурсию чтобы случайная фраза не повторилась с предыдущей

  return randomPrompt; // Вернем как результат работы эту случайную фразу
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`)
}
