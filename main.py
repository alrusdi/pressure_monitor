import json

from flask import Flask, render_template, send_from_directory

app = Flask(__name__)


@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)


@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)


@app.route("/pressure", methods=["GET", "POST"])  # Таблица давления
def pressure():
    # Создание Вывод таблицы давления
    pressure_days = {
        "21.01.2020": [
            {"time": "14:43", "top_pressure": 120, "bottom_presure": 80},
            {"time": "16:43", "top_pressure": 120, "bottom_presure": 80},
        ],
        "22.01.2020": [
            {"time": "14:43", "top_pressure": 120, "bottom_presure": 80},
        ],
        "24.01.2020": [
            {"time": "18:43", "top_pressure": 150, "bottom_presure": 110},
            {"time": "19:43", "top_pressure": 140, "bottom_presure": 100},
            {"time": "20:43", "top_pressure": 120, "bottom_presure": 80},
        ],
    }

    return render_template(
        "pressure_base.html",
        pressure=convert_pressure_days(pressure_days)
    )


def convert_pressure_days(pressure_days):
    output = []
    for day, measures in pressure_days.items():
        is_day_has_danger_values = False
        for meas in measures:
            meas["is_danger"] = is_measure_danger(meas)
            if meas["is_danger"]:
                is_day_has_danger_values = True

        output.append({
            "day": day,
            "is_danger": is_day_has_danger_values,
            "measures": measures
        })
    return output


@app.route('/admin', methods=['GET', 'POST'])  # Обработка страницы Список языков
def admin_admin():
    data = {
        "chart1": {
            "days": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
                     23, 24, 25, 26],
            "count_android": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                              21, 22, 23, 24, 25, 26],
            "count_apple": [11, 22, 13, 44, 15, 76, 17, 18, 39, 12, 15, 18, 29, 34, 45, 56, 67, 28,
                            19, 24, 39, 21, 14, 12, 11, 1]
        },
        "chart2": {
            "days": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
                     23, 24, 25, 26],
            "count_android": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                              21, 22, 23, 24, 25, 26],
            "count_apple": [11, 22, 13, 44, 15, 76, 17, 18, 39, 12, 15, 18, 29, 34, 45, 56, 67, 28,
                            19, 24, 39, 21, 14, 12, 11, 1]
        },
        "chart3": {
            "days": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
                     23, 24, 25, 26],
            "count_android": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                              21, 22, 23, 24, 25, 26],
            "count_apple": [11, 22, 13, 44, 15, 76, 17, 18, 39, 12, 15, 18, 29, 34, 45, 56, 67, 28,
                            19, 24, 39, 21, 14, 12, 11, 1]
        }
    }
    return render_template('rock.html', data={k: json.dumps(v) for k, v in data.items()})


def is_measure_danger(measure):
    if measure["top_pressure"] > 120:
        return True
    if measure["bottom_presure"] > 80:
        return True
    return False


if __name__ == "__main__":
    app.run()
