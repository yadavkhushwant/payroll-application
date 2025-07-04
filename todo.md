# TODO: Create a Separate `payroll-common` Module

## 1. Create `payroll-common` Module
- [ ] Generate a new Maven/Gradle module for `payroll-common`.
- [ ] Add it to the main project structure.

## 2. Move Common Entities to `payroll-common`
- [ ] Move `RoleEntity`, `UserEntity`, `TenantEntity` from `payroll-app`.
- [ ] Ensure correct package structure (`com.codemantri.payroll.common.entity`).

## 3. Move Common Repositories to `payroll-common`
- [ ] Move `RoleRepository`, `TenantRepository`.
- [ ] Ensure repositories work properly inside both applications.

## 4. Configure Dependencies
- [ ] Add `payroll-common` dependency to `payroll-app`.
- [ ] Add `payroll-common` dependency to `admin-app`.
- [ ] Ensure both apps can access entities and repositories correctly.

## 5. Enforce Read-Only Mode in `payroll-app`
- [ ] Configure transactions to be `@Transactional(readOnly = true)`.
- [ ] Ensure repositories in `payroll-app` only support read operations.

## 6. Full CRUD Access in `admin-app`
- [ ] Verify that `admin-app` can perform CRUD operations on `RoleEntity`, `TenantEntity`, etc.
- [ ] Ensure proper validation and security for data modifications.

## 7. Test and Validate
- [ ] Ensure both apps work without breaking changes.
- [ ] Verify that `payroll-app` is truly read-only.
- [ ] Test CRUD operations in `admin-app`.
- [ ] Deploy and monitor logs for errors or issues.

## 8. Create robust system for admin user creation when business setup completed
