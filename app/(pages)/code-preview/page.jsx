'use client';
import CodePreview from '@/src/components/widgets/CodePreview/CodePreview';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Page() {
  const [sidebarNodes, setSidebarNodes] = useState([]);
  const responseData = useSelector((state) => state?.data?.responseData);

  useEffect(() => {
    setSidebarNodes(responseData);
  }, [responseData]);

  return (
    <div className="output h-[100vh]">
      <CodePreview sidebarNodes={sidebarNodes} />
    </div>
  );
}
