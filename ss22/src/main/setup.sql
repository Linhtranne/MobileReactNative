create database ss22;
use ss22;

INSERT INTO task (name, priority, status, description)
VALUES
    ('Viết báo cáo đồ án', 'HIGH', 'PENDING', 'Hoàn thành phần kết luận và tài liệu tham khảo'),
    ('Chạy bộ buổi sáng', 'MEDIUM', 'COMPLETED', 'Chạy 5km quanh công viên'),
    ('Nấu cơm trưa', 'LOW', 'PENDING', 'Chuẩn bị nguyên liệu và nấu ăn cho gia đình'),
    ('Học React Native', 'HIGH', 'PENDING', 'Xem video bài giảng và thực hành code'),
    ('Ôn tập toán', 'MEDIUM', 'COMPLETED', 'Làm bài tập về xác suất và thống kê');
