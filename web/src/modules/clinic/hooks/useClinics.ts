import { useContext, useEffect, useState } from "react";
import { Clinic } from "../../../models/clinic";
import { getClinics } from "../api/getClinics";
import { AdminContext } from "../../../context/AdminContext";

export const useClinics = () => {
  const { getCurrentAdmin } = useContext(AdminContext);

  const [clinics, setClinics] = useState<Clinic[]>([]);

  useEffect(() => {
    getClinics(getCurrentAdmin()).then((clinics) => {
      setClinics(clinics);
    });
  }, []);

  return { clinics };
};
