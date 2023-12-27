import { siteConfig } from '@/const/site.config';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const getCogsrchData = async () => {
    setIsLoading(true);
    try {
      console.log('start');
      const res = await axios.post('api/cogsrch', { message });
      console.log('🚀 ~ file: index.tsx:38 ~ getCogsrchData ~ res:', res.data);
      setContent(res.data.result.output);
    } catch (err) {
      console.log('🚀 ~ file: index.tsx:40 ~ getCogsrchData ~ err:', err);
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="pt-12">
        <h1 className="text-5xl mb-8">{siteConfig.title}</h1>
        <main className="grid md:gap-6 mt-10 md:grid-cols-1 w-full my-12">
          <div>
            <div className="mb-5">
              <p>🔸概要</p>
              <p>
                このサイトは、Azure OpenAI + LangChain + AI
                Searchを使った回答を返すサイトです。
                <br />
                学習させた資料はACSDのCultureDeckです。
              </p>
            </div>
            <div className="mb-5">
              <p>🔸資料</p>
              <Link
                className="text-blue-500 hover:text-blue-700"
                href="https://www.ap-com.co.jp/pdf/ACSD_CultureDeck_20230901.pdf"
              >
                ACSD_CultureDeck_20230901.pdf
              </Link>
            </div>
            <div className="mb-5">
              <p>🔸アーキテクチャ</p>
              <Link className="text-blue-500 hover:text-blue-700" href="/about">
                About Architect
              </Link>
            </div>
          </div>
          <label htmlFor="message" className="block font-medium text-gray-900">
            🔸ACSD_CultureDeckで知りたいことを入力してください
          </label>
          <textarea
            id="message"
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
          <div className="flex items-center">
            <button
              onClick={getCogsrchData}
              type="button"
              className="my-5 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
            >
              Answer
            </button>
          </div>
          {isLoading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div>
              {content === '' ? (
                <div></div>
              ) : (
                <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                  <p className="font-normal text-gray-700">{content}</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}
