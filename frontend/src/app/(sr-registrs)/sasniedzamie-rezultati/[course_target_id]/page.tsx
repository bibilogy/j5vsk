"use client";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CourseTarget, SubjectType } from "@/app/lib/types";
import { Button, Skeleton, Stack, TextField, Typography } from "@mui/material";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import CustomIcon from "@/app/components/CustomIcon";

export default function CourseSubjectPage() {
  const [courseTarget, setCourseTarget] = useState<CourseTarget | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<{
    isSnackbarOpen: boolean;
    message: string;
  }>({ isSnackbarOpen: false, message: "" });
  const [originalTarget, setOriginalTarget] = useState<string>("");
  const isChanged = courseTarget?.target !== originalTarget;
  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const params = useParams();

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseTargetId = params.course_target_id;
        const response = await fetch(
          `${apiUrl}/msr/subject-target?course_target_id=${courseTargetId}`
        );

        if (!response.ok) {
          notFound();
        }

        const crs: CourseTarget = await response.json();
        setCourseTarget(crs);
        setOriginalTarget(crs.target);
      } catch (error) {
        console.error("Error fetching subjects data:", error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params, apiUrl]);

  if (isLoading) {
    return (
      <Stack width="100%" height="100%">
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height="100%"
        />
      </Stack>
    );
  }

  if (!courseTarget) {
    return (
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "15px",
          backgroundColor: "#eee",
        }}
      >
        <Typography variant="h6">Dati nav atrasti</Typography>
      </Stack>
    );
  }

  const handleSaveCourseTarget = async () => {
    try {
      if (!courseTarget) return;
      setIsSaving(true);
      const response = await fetch(`${apiUrl}/msr/update-course-target`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseTargetId: courseTarget.courseTargetId,
          target: courseTarget.target,
        }),
      });
      if (!response.ok) throw new Error(response.statusText);
      setOriginalTarget(courseTarget.target);
      setSnackbar({ isSnackbarOpen: true, message: "Dati ir saglabāti" });
    } catch (error) {
      setSnackbar({
        isSnackbarOpen: true,
        message: error instanceof Error ? error.message : "Nezināma kļūda",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar((prev) => ({ ...prev, isSnackbarOpen: false }));
  };

  return (
    <Stack spacing={2}>
      <Stack
        spacing={1}
        sx={{
          flexDirection: "row",
          gap: "20px",
          backgroundColor: "#eee",
          borderRadius: "15px",
          padding: "20px",
        }}
      >
        <Stack>
          <CustomIcon
            icon={courseTarget?.subjectIcon as SubjectType}
            size={70}
          />
        </Stack>
        <Stack spacing={1}>
          <Typography
            gutterBottom
            sx={{
              fontSize: "1rem",
              fontWeight: 700,
            }}
            component="div"
          >
            {(
              courseTarget?.description?.toUpperCase() || "No Subject"
            ).toUpperCase()}
          </Typography>

          <Stack>{`Mācību joma: ${courseTarget?.subjectField}`}</Stack>
        </Stack>
      </Stack>

      <Stack
        spacing={1}
        sx={{
          borderRadius: "15px",
          gap: "10px",
        }}
      >
        <TextField
          id="filled-multiline-static"
          label={`Sasniedzāmie rezultāti priekšmetā ${courseTarget?.subjectName.toLowerCase()}`}
          multiline
          rows={isSmallScreen ? 15 : 20}
          value={courseTarget?.target}
          onChange={(e) =>
            setCourseTarget((prev) =>
              prev ? { ...prev, target: e.target.value } : prev
            )
          }
          variant="filled"
          sx={{
            "& .MuiFilledInput-root": {
              borderRadius: "15px",
              backgroundColor: "#f5f5f5",
              border: "1px solid transparent", // initial transparent border
              transition: "border-color 0.2s",
            },
            "& .MuiFilledInput-root.Mui-focused": {
              borderColor: "primary.main", // primary border when focused
            },
            "& .MuiFilledInput-underline:before": {
              borderBottom: "none",
            },
            "& .MuiFilledInput-underline:after": {
              borderBottom: "none",
            },
            "& .MuiFilledInput-underline:hover:before": {
              borderBottom: "none !important",
            },
          }}
        />

        <Button
          variant="contained"
          onClick={handleSaveCourseTarget}
          loading={isSaving}
          loadingPosition="end"
          disabled={!isChanged || isSaving}
        >
          Saglabāt
        </Button>
        <Snackbar
          open={snackbar.isSnackbarOpen}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          message={snackbar.message}
        />
      </Stack>
    </Stack>
  );
}
