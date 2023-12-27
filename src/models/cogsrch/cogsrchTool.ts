import { Tool } from 'langchain/tools';
import { CogsrchClient } from './cogsrchClient';

export class CogsrchTool extends Tool {
  name = 'culturedeck';
  description = `
  株式会社エーピーコミュニケーションズのACSD事業部のCulture Deck。エーピーコミュニケーションズの紹介や事業内容、人事制度や採用プロセスが記載されています。
  ACS事業部はNeoSIerの新たなSIモデルとして、
  エンタープライズ企業のDX内製化を推進しております。
  内製化推進のため、Platform EngineeringやAIを活用し、
  セルフサービス化されたSIを確立し提供することで、
  日本企業のデジタル化を加速させて参ります
  インプットは検索クエリ、アウトプットは検索結果です。
  `;
  constructor() {
    super();
  }

  async _call(input: any) {
    try {
      const client = new CogsrchClient();
      const result = await client.searchVector(input, { top: 1 });
      const arr = result.data.value;
      if (arr.length > 0) {
        const docs = arr.map((item: any) => {
          return item.content;
        });
        return docs.join('\n');
      } else {
        return 'No results found';
      }
    } catch (err) {
      console.log(
        '🚀 ~ file: cogsrchTool.ts:22 ~ CognitiveSearchTool ~ _call ~ err:',
        err
      );
    }
  }
}
