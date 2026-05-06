"use client";

import {
  fetchPendingTestEnrollments,
  fetchCourseTargets,
} from "@/actions/data-fetching";
import DataGrid from "@/components/DataGrid";
import { getPendingTestColumnDefs } from "@/types/definitions/pendingTestColumns";
import { getCourseTargetColumnDefs } from "@/types/definitions/courseTargetColumns";
import { PendingTestEnrollment, _CourseTarget } from "@/types/types";
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMobileTestColumnDefs } from "@/types/definitions/getMobileTestColumnDefs";
import { useRouter } from "next/navigation";
import { LayoutList } from "lucide-react";

export default function HomePage() {
  const [pendingTests, setPendingTests] = useState<PendingTestEnrollment[]>();
  const [courseTargets, setCourseTargets] = useState<_CourseTarget[]>();
  const [activeTab, setActiveTab] = useState("pending");
  const router = useRouter();

  useEffect(() => {
    fetchPendingTestEnrollments().then(setPendingTests);
  }, []);

  useEffect(() => {
    if (activeTab === "targets" && courseTargets === undefined) {
      fetchCourseTargets().then(setCourseTargets);
    }
  }, [activeTab, courseTargets]);

  const pendingColDefs = useMemo(() => getPendingTestColumnDefs(), []);
  const mobileColDefs = useMemo(() => getMobileTestColumnDefs(), []);
  const targetColDefs = useMemo(() => getCourseTargetColumnDefs(), []);

  const pendingRowData = useMemo(() => pendingTests ?? [], [pendingTests]);
  const targetRowData = useMemo(() => courseTargets ?? [], [courseTargets]);

  return (
    <div className="flex flex-col gap-4 h-full">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col h-full"
      >
        <TabsList className="w-fit bg-white/30 border border-white/40 rounded-xl px-1 py-1 self-start">
          <TabsTrigger
            value="pending"
            className="flex items-center gap-1.5 text-purple-900/60 text-xs font-medium rounded-lg data-[state=active]:bg-white/60 data-[state=active]:text-purple-900 data-[state=active]:shadow-sm px-4 py-1.5"
          >
            <LayoutList className="w-4 h-4" />
            <span>KPD reģistrs</span>
          </TabsTrigger>
          <TabsTrigger
            value="targets"
            className="text-purple-900/60 gap-1.5 text-xs font-medium rounded-lg data-[state=active]:bg-white/60 data-[state=active]:text-purple-900 data-[state=active]:shadow-sm px-4 py-1.5"
          >
            <LayoutList className="w-4 h-4" />
            <span>SR reģistrs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="pending"
          className="flex-1 mt-0 min-h-0 flex flex-col"
        >
          <div className="hidden md:flex flex-col h-full min-h-0">
            <DataGrid
              rowData={pendingRowData}
              columnDefs={pendingColDefs}
              getRowId={(row) => String(row.enrollment_id)}
              loading={pendingTests === undefined}
              hasExport
            />
          </div>
          <div className="md:hidden flex flex-col h-full min-h-0">
            <DataGrid
              rowData={pendingRowData}
              columnDefs={mobileColDefs}
              getRowId={(row) => String(row.enrollment_id)}
              loading={pendingTests === undefined}
            />
          </div>
        </TabsContent>

        <TabsContent value="targets" className="flex-1 mt-0 min-h-0">
          <DataGrid
            rowData={targetRowData}
            columnDefs={targetColDefs}
            getRowId={(row) => String(row.course_target_id)}
            loading={courseTargets === undefined}
            onRowClicked={(row) =>
              router.push(
                `/grade-groups/${row?.data?.grade_group_id}/courses/${row?.data?.course_id}`,
              )
            }
            rowClass="cursor-pointer"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
