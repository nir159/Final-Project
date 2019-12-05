#include "Course.h"
#include <string>

class Student
{
public:
	void init(std::string name, Course** courses, int crsCount);

	std::string getName();
	void setName(std::string name);
	int getCrsCount();
	Course** getCourses();
	double getAvg();


private:
	std::string _name;
	Course** _Courses;//array of pointers to Course
	int _crsCount;
};