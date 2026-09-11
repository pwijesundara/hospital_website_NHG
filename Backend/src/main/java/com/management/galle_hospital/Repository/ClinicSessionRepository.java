package com.management.galle_hospital.Repository;

import com.management.galle_hospital.Model.ClinicSession;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClinicSessionRepository extends JpaRepository<ClinicSession, Long> {

    // Locks the ClinicSession row until the enclosing transaction commits, so concurrent
    // acceptRequest() calls for the same session serialize instead of both reading a
    // stale accepted-count and both passing the capacity check.
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select cs from ClinicSession cs where cs.id = :id")
    Optional<ClinicSession> findByIdForUpdate(@Param("id") Long id);
}
