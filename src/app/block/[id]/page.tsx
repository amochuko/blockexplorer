'use client';
import { BlockDetails } from '@/app/_components/block';
import { useBlock } from '@/app/_components/hooks/useBlock';
import { Block } from '@ethersproject/providers';
import { useEffect, useState } from 'react';

interface BlockDetailsProps {
  params: Record<string, string>;
}
export default function BlockDetailsPage(props: BlockDetailsProps) {
  const { getBlockByNumber } = useBlock();
  const [block, setBlock] = useState<Block>();
  const [error, setError] = useState<any>({});

  useEffect(() => {
    const getBlock = async (blkNumber: string | number) => {
      try {
        const blk = await getBlockByNumber(blkNumber);
        setBlock(blk);
      } catch (err: any) {
        setError(err.message);
      }
    };

    getBlock(+props.params.id);
  }, []);

  return (
    <>
      {error && error.message}
      <BlockDetails block={block!} />
    </>
  );
}
