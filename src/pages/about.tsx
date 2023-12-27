import { siteConfig } from '@/const/site.config';
import Image from 'next/image';
import Link from 'next/link';
import ArchitectImage from '../asset/archi.png';
import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <div className="pt-12 h-screen">
        <h1 className="text-5xl mb-8">{siteConfig.title}</h1>
        <main className="grid md:gap-6 mt-10 md:grid-cols-1 w-full my-12">
          <div>
            <div className="mb-5">
              <p>🔸アーキテクチャ</p>
              <div>
                <Image
                  src={ArchitectImage}
                  alt="architect"
                  width={800}
                  height={600}
                ></Image>
              </div>
            </div>
            <div className="mb-5">
              <p>🔸GitHubリポジトリ</p>
              <Link
                className="text-blue-500 hover:text-blue-700"
                href="https://www.ap-com.co.jp/pdf/ACSD_CultureDeck_20230901.pdf"
              >
                https://github.com/apc-y-satake/poc-openai-search-webapp
              </Link>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
