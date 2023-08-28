'use client';

import { BlockList } from '../_components/block/blocks/BlockList';
import { Header } from '../_components/header/header';
import { useBlock } from '../_components/hooks/useBlock';
import './blocks-page.scss';

export default function BlocksPage() {
  const { blocks } = useBlock();
  const { finalizedBlock, networkUtilization } = useBlock();

  const data = [
    // TODO: Update with BLOCK info
    {
      title: 'network utilization',
      value: `${networkUtilization} %`,
    },
    { title: 'last finalized block', value: finalizedBlock },
  ];

  return (
    <>
      <Header data={data} />
      <BlockList blocks={blocks} />;
    </>
  );
}
